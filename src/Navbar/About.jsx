export function About(){
    return(
    <>
    <div className="w-auto h-auto bg-gray-300 rounded-lg mt-3 md:mt-5 mx-3 md:mt-5 py-6 md:py -16 px-4 md:px-20 text-gray-800 text-center hover:-translate-z-25">
  <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">About the Quiz</h2>
  <p className="text-sm md:text-lg max-w-3xl mx-auto">
    This quiz is designed for Java, Python and JavaScript enthusiasts. Each quiz contains multiple-choice questions that challenge your understanding of programming fundamentals, syntax, and logic.
  </p>
  <div className="grid md:grid-cols-3 gap-4 md:gap-8 mt-6 md:mt-10 max-w-2xl mx-auto text-left">
    <div className="bg-gray-100 p-4 md:p-6 rounded-lg shadow">
      <h3 className="text-base md:text-lg font-semibold mb-2">🧠 Java</h3>
      <p className="text-xs md:text-sm">Focuses on OOP, exception handling, collections, and more.</p>
    </div>
    <div className="bg-gray-100  p-4 md:p-6 rounded-lg shadow">
      <h3 className="text-base md:text-lg font-semibold mb-2">🐍 Python </h3>
      <p className="text-xs md:text-sm">Test your skills in functions, data types, libraries, and coding logic.</p>
    </div>
    <div className="bg-gray-100 p-4 md:p-6 rounded-lg shadow">
      <h3 className="text-base md:text-lg font-semibold mb-2">⚡ JavaScript</h3>
      <p className="text-xs md:text-sm">Covers DOM manipulation, ES6 features, asynchronous programming, and more.</p>
    </div>
  </div>
</div>
    </>
);
} 