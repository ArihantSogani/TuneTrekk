import axios from 'axios';

export const getRecommendations = async (req, res) => {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: 'Recommend some good songs for a chill vibe.',
          },
        ],
        max_tokens: 100,
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const recommendations = response.data.choices[0].message.content;
    res.json({ recommendations });
  } catch (error) {
    console.error(error.response ? error.response.data : error.message);
    res.status(500).json({ message: 'Error fetching recommendations' });
  }
};
