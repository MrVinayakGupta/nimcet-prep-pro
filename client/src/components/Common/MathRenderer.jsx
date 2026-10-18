import React from 'react';
import katex from 'katex';

export const InlineMath = ({ math }) => {
  if (!math) return null;
  try {
    const html = katex.renderToString(String(math), { throwOnError: false, displayMode: false });
    return <span dangerouslySetInnerHTML={{ __html: html }} />;
  } catch (err) {
    return <span>{math}</span>;
  }
};

export const BlockMath = ({ math }) => {
  if (!math) return null;
  try {
    const html = katex.renderToString(String(math), { throwOnError: false, displayMode: true });
    return <div style={{ overflowX: 'auto', margin: '0.5rem 0' }} dangerouslySetInnerHTML={{ __html: html }} />;
  } catch (err) {
    return <div>{math}</div>;
  }
};

export const MathText = ({ text }) => {
  if (!text) return null;
  const parts = String(text).split('$');
  return (
    <>
      {parts.map((part, i) => {
        if (i % 2 === 1) {
          return <InlineMath key={i} math={part} />;
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
};

export default MathText;
