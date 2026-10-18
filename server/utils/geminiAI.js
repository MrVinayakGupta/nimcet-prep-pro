const generateExplanation = async (questionText, options, correctAnswer) => {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not configured');
    }

    const optionsText = options.map(opt => `${opt.id}: ${opt.text}`).join('\n');
    
    const prompt = `
      You are an expert tutor for the NIMCET exam. Please provide a detailed, step-by-step explanation for the following question.
      
      Question: ${questionText}
      
      Options:
      ${optionsText}
      
      Correct Answer: ${correctAnswer}
      
      Format the response as a JSON string with the following structure:
      {
        "summary": "Brief explanation of the answer",
        "prerequisites": [{"topic": "Topic Name", "description": "What to know first", "importance": "high/medium/low"}],
        "stepByStep": [{"stepNumber": 1, "title": "Step 1", "content": "Explanation", "formula": "LaTeX formula if any", "calculation": "Calculations if any"}],
        "conceptUsed": "Main concept",
        "tips": ["Tip 1", "Tip 2"],
        "commonMistakes": ["Mistake 1"]
      }
      
      Ensure the output is ONLY valid JSON.
    `;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });

    const data = await response.json();
    if (data.error) {
      throw new Error(data.error.message);
    }
    
    const textResponse = data.candidates[0].content.parts[0].text;
    const jsonStr = textResponse.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(jsonStr);

  } catch (error) {
    console.error('Error generating AI explanation:', error);
    return {
      summary: "AI explanation generation failed.",
      prerequisites: [],
      stepByStep: [{ stepNumber: 1, title: "Error", content: "Could not fetch explanation from AI." }],
      conceptUsed: "N/A",
      tips: [],
      commonMistakes: []
    };
  }
};

module.exports = { generateExplanation };
