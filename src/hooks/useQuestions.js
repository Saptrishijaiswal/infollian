import { useState } from 'react';

const useQuestions = () => {
  const [questions, setQuestions] = useState([]);

  const generateId = () => '_' + Math.random().toString(36).substr(2, 9);

  const addQuestion = () => {
    const newQuestion = {
      id: generateId(),
      text: '',
      type: 'Short Answer',
      answer: '',
      depth: 0,
      children: [],
    };
    setQuestions([...questions, newQuestion]);
  };

  const addChildQuestion = (id) => {
    const updatedQuestions = addChild(questions, id, 1);
    setQuestions(updatedQuestions);
  };

  const addChild = (questions, id, depth) => {
    return questions.map(q => {
      if (q.id === id) {
        const newChild = {
          id: generateId(),
          text: '',
          type: 'Short Answer',
          answer: '',
          depth: depth,
          children: [],
        };
        return { ...q, children: [...q.children, newChild] };
      }
      return { ...q, children: addChild(q.children, id, depth + 1) };
    });
  };

  const deleteQuestion = (id) => {
    const updatedQuestions = removeQuestion(questions, id);
    setQuestions(updatedQuestions);
  };

  const removeQuestion = (questions, id) => {
    return questions.filter(q => q.id !== id).map(q => ({
      ...q,
      children: removeQuestion(q.children, id)
    }));
  };

  const updateQuestion = (id, field, value) => {
    const updatedQuestions = updateQuestionDetails(questions, id, field, value);
    setQuestions(updatedQuestions);
  };

  const updateQuestionDetails = (questions, id, field, value) => {
    return questions.map(q => {
      if (q.id === id) {
        return { ...q, [field]: value };
      }
      return { ...q, children: updateQuestionDetails(q.children, id, field, value) };
    });
  };

  return {
    questions,
    addQuestion,
    addChildQuestion,
    deleteQuestion,
    updateQuestion,
  };
};

export default useQuestions;