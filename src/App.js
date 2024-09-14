import React, { useState } from 'react';
import QuestionItem from './components/QuestionItem';
import QuestionDisplay from './components/QuestionDisplay';
import useQuestions from './hooks/useQuestions';

const App = () => {
  const { questions, addQuestion, addChildQuestion, deleteQuestion, updateQuestion } = useQuestions();
  const [submittedQuestions, setSubmittedQuestions] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedQuestions(questions);
  };

  return (
    <div>
      <h1>My Dynamic Question Form</h1>
      {submittedQuestions ? (
        <QuestionDisplay questions={submittedQuestions} />
      ) : (
        <>
          <button onClick={addQuestion}>Add New Question</button>
          <form onSubmit={handleSubmit}>
            {questions.map((q, index) => (
              <QuestionItem
                key={q.id}
                question={q}
                numbering={`Q${index + 1}`}
                onAddChild={addChildQuestion}
                onDelete={deleteQuestion}
                onUpdate={updateQuestion}
              />
            ))}
            <button type="Submit">Submit</button>
          </form>
        </>
      )}
    </div>
  );
};

export default App;
