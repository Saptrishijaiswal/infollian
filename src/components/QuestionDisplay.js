import React from 'react';

const QuestionDisplay = ({ questions }) => {
  const generateNumber = (prefix, index) => `${prefix}${index + 1}`;

  const renderQuestions = (items, numbering = '') => {
    return items.map((q, index) => {
      const currentNumbering = generateNumber(numbering ? numbering + '.' : 'Q', index);
      return (
        <div key={q.id} style={{ marginLeft: `${q.depth * 20}px` }}>
          <strong>{currentNumbering}</strong> {q.text} ({q.type}){' '}
          {q.type === 'True/False' && `Answer: ${q.answer}`}
          {q.children.length > 0 && renderQuestions(q.children, currentNumbering)}
        </div>
      );
    });
  };

  return <div>{renderQuestions(questions)}</div>;
};

export default QuestionDisplay;
