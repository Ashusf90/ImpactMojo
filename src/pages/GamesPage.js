import React from 'react';

const GamesPage = () => {
  // The games data is included directly here to prevent any import errors.
  const gamesData = [
    { 
      id: "the-real-middle-game",
      title: "The Real Middle Game", 
      description: "An interactive strategy game for development professionals. Navigate complex scenarios and make decisions with real-world consequences.",
      url: "https://101.www.impactmojo.in/theREALmiddlegame",
      category: "Strategy",
      difficulty: "Intermediate"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold text-center mb-12">Games</h1>
      <p className="text-center text-lg text-gray-600 dark:text-gray-300 mb-12">Learn through play with our interactive games designed for development learning.</p>
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {gamesData.map(game => (
          <div key={game.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{game.title}</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">{game.description}</p>
            <a href={game.url} target="_blank" rel="noopener noreferrer" className="text-center bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 mt-auto">
              Play Game
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GamesPage;

