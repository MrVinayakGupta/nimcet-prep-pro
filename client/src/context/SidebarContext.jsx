import React, { createContext, useContext, useState } from 'react';

const SidebarContext = createContext();

export const useSidebar = () => useContext(SidebarContext);

export const SidebarProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [expandedSubjects, setExpandedSubjects] = useState({});
  const [expandedChapters, setExpandedChapters] = useState({});
  const [selectedTopic, setSelectedTopic] = useState(null); // keeping for backward compatibility if needed
  const [selectedTopicId, setSelectedTopicId] = useState(null);
  const [selectedChapterId, setSelectedChapterId] = useState(null);
  const [selectedSubjectId, setSelectedSubjectId] = useState(null);

  const toggleSidebar = () => setIsOpen(prev => !prev);
  
  const toggleSubject = (subjectId) => {
    setExpandedSubjects(prev => ({ ...prev, [subjectId]: !prev[subjectId] }));
  };

  const toggleChapter = (chapterId) => {
    setExpandedChapters(prev => ({ ...prev, [chapterId]: !prev[chapterId] }));
  };

  return (
    <SidebarContext.Provider value={{
      isOpen, toggleSidebar,
      expandedSubjects, toggleSubject,
      expandedChapters, toggleChapter,
      selectedTopic, setSelectedTopic,
      selectedTopicId, setSelectedTopicId,
      selectedChapterId, setSelectedChapterId,
      selectedSubjectId, setSelectedSubjectId
    }}>
      {children}
    </SidebarContext.Provider>
  );
};
