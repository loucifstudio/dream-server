const express = require('express');
const { GoogleGenAI } = require('@google/genai');

const app = express();
app.use(express.json());

// تهيئة Gemini باستخدام المفتاح السري الذي سنضعه في إعدادات المنصة لاحقاً
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

app.post('/interpret-dream', async (req, res) => {
  try {
    const { dream } = req.body;
    if (!dream) {
      return res.status(400).json({ error: 'الرجاء إدخال نص الحلم' });
    }

    const response =.ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `أنت معبر رؤى وأحلام محترف. فسر هذا الحلم بدقة ووضوح: ${dream}`
    });

    res.json({ interpretation: response.text });
  } catch (error) {
    res.status(500).json({ error: 'حدث خطأ في الخادم أثناء تفسير الحلم' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
