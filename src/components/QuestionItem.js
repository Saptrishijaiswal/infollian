import React from 'react';

const QuestionItem = ({ question, onDelete, onAddChild, onUpdate, numbering }) => {
  const handleTextChange = (e) => {
    onUpdate(question.id, 'text', e.target.value);
  };

  const handleTypeChange = (e) => {
    onUpdate(question.id, 'type', e.target.value);
  };

  const handleAnswerChange = (e) => {
    onUpdate(question.id, 'answer', e.target.value);
  };

  return (
    <div style={{ marginLeft: `${question.depth * 20}px` }}>
      <h4>{numbering}</h4>
      <input
        type="text"
        value={question.text}
        onChange={handleTextChange}
        placeholder="Enter question"
      />
      <select
        value={question.type}
        onChange={handleTypeChange}
      >
        <option value="Short Answer">Short Answer</option>
        <option value="True/False">True/False</option>
      </select>

      {question.type === 'True/False' && (
        <>
          <select
            value={question.answer}
            onChange={handleAnswerChange}
          >
            <option value="">Select Answer</option>
            <option value="True">True</option>
            <option value="False">False</option>
          </select>
          {question.answer === 'True' && (
            <button type="button" onClick={() => onAddChild(question.id)}>Add Child Question</button>
          )}
        </>
      )}

      <button type="button" onClick={() => onDelete(question.id)}>Delete</button>

      {question.children.map((child, index) => (
        <QuestionItem
          key={child.id}
          question={child}
          numbering={`${numbering}.${index + 1}`}
          onAddChild={onAddChild}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
};

export default QuestionItem;
