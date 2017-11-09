import React from 'react';
import resolve from '../hocs/resolve';

const root = () => (
  <div>Root</div>
);

export default resolve(root, 'qDoc');
