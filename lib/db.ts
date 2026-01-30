import { db, storage } from "./firebase";
import { collection, addDoc, query, where, getDocs, writeBatch, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export async function publishDailyGame(gameSlug: string, data: any) {
    try {
        const today = new Date().toISOString().split('T')[0];
        let imageUrl = "";

        // 1. Handle Image Upload (for Zip or if Screenshot provided)
        if (data.file && data.file instanceof File) {
            const storageRef = ref(storage, `daily_solutions/${gameSlug}/${today}_${Date.now()}`);
            await uploadBytes(storageRef, data.file);
            imageUrl = await getDownloadURL(storageRef);
        }

        // 2. Prepare Payload
        const payload = {
            game: gameSlug, // 'pinpoint', 'zip', 'queens'
            date: today,
            timestamp: serverTimestamp(),
            // Specific Data
            imageUrl: imageUrl || null,
            lines: data.lines || [],
            category: data.category || null,
            notes: data.notes || null,
            confidence: data.confidence || 0,
        };

        // 3. Clean up old entries for TODAY (Rule: only 1 active solution per game per day?)
        // User said "24h retention". For now, we just push new one.
        // Ideally, we could delete previous entry for "today" to avoid duplicates.

        // 4. Save to Firestore
        await addDoc(collection(db, "solutions"), payload);

        return true;
    } catch (error) {
        console.error("Error publishing game:", error);
        throw error;
    }
}
