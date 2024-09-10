import React from 'react';

const Filter = ({ onSortChange, onCategoryChange, categories }) => (
  <div className={'filter'}>
    <select onChange={e => onSortChange(e.target.value)}>
      <option value="a-z">Сортировка по алфавиту</option>
      <option value="z-a">Сортировка в обратном порядке</option>
    </select>
    <select onChange={e => onCategoryChange(e.target.value)}>
      <option value="">Категории публикаций</option>
      {categories.map(category => (
        <option key={category} value={category}>{category}</option>
      ))}
    </select>
  </div>
);

export default Filter;