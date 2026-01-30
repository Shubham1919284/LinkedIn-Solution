'use server';

import * as admin from 'firebase-admin';
import { adminDb, adminStorage } from '@/lib/firebase-admin';

export async function publishGameAction(formData: FormData) {
    try {
        const game = formData.get('game') as string;
        const file = formData.get('file') as File;

        if (!game || !file) throw new Error("Missing game or file");

        const today = new Date().toISOString().split('T')[0];
        const filename = `daily_solutions/${game}/${today}_${Date.now()}`;

        // 1. DELETE EXISTING SOLUTION (Data Retention Policy)
        // User wants previous input for the day to be "revoked" / replaced.
        const existingDocs = await adminDb.collection('solutions')
            .where('game', '==', game)
            .where('date', '==', today)
            .get();

        if (!existingDocs.empty) {
            console.log(`Found ${existingDocs.size} existing solution(s) for ${game} on ${today}. Deleting...`);
            const batch = adminDb.batch();
            existingDocs.forEach(doc => {
                batch.delete(doc.ref);
            });
            await batch.commit();
            console.log("Deleted old solutions.");
        }

        // 2. Upload to Firebase Storage using Admin SDK
        console.log(`Uploading file to bucket: ${adminStorage.bucket().name}`);
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const bucket = adminStorage.bucket();
        const fileRef = bucket.file(filename);

        await fileRef.save(buffer, {
            metadata: {
                contentType: file.type,
            },
            public: true, // Make file publicly accessible
        });

        // Get public URL
        // Note: 'public: true' allows access via the public storage.googleapis.com endpoint
        const imageUrl = `https://storage.googleapis.com/${bucket.name}/${filename}`;
        console.log("File uploaded. Public URL:", imageUrl);

        // 3. Save to Firestore using Admin SDK
        const payload = {
            game,
            date: today,
            timestamp: admin.firestore.FieldValue.serverTimestamp(),
            imageUrl: imageUrl,
            lines: [],
            category: null,
            notes: null,
            confidence: 0,
        };

        await adminDb.collection('solutions').add(payload);
        console.log("Firestore document created.");

        return { success: true, imageUrl };

    } catch (error: any) {
        console.error("Server Action Detailed Error:", error);
        // Return the exact error message to the client
        return { success: false, error: `Server Error: ${error.message}` };
    }
}
