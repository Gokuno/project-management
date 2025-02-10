"use client"

import { useAppSelector } from '@/app/redux';
import Header from '@/components/Header';
import { useGetProjectsQuery } from '@/state/api';
import { DisplayOption, Gantt, ViewMode } from 'gantt-task-react';
import "gantt-task-react/dist/index.css";
import React, { useMemo, useState } from 'react';


type TaskTypeItem = "task" | "milestone" | "project";

const Timeline = () => {
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  const { data: projects, isLoading, isError } = useGetProjectsQuery();
  
  
  const [displayOption, setDisplayOption] = useState<DisplayOption>({
    viewMode: ViewMode.Month,
    locale: 'en-US',
    dateFormat: 'dd/mm/yyyy', // Custom date format
  });

  const ganttTasks = useMemo(() => {
    return (
      projects?.map((project) => ({
        start: new Date(project.startDate as string),
        end: new Date(project.endDate as string),
        name: project.name,
        id: `Project-${project.id}`,
        type: "project" as TaskTypeItem,
        progress: 50,
        isDisabled: false,
      })) || []
    )
  }, [projects]);

  const handleViewModeChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setDisplayOption((prev) => ({
      ...prev,
      viewMode: event.target.value as ViewMode,
    }));
  };

  if (isLoading) return <div>Loading...</div>
  if (isError || !projects) return <div>An error occurred while fetching projects</div>;

  return (
    <div className='max-w-full p-8'>
      <header className='mb-4 flex items-center justify-between'>
        <Header
          name="Projects Timeline"
        />
        <div className='relative inline-block w-64'>
          <select
            className='focus:shadow-outline block w-full appearance-none rounded border border-gray-400 bg-white px-4 py-2 pr-8 leading-tight shadow hover:border-gray-500 focus:outline-none dark:border-dark-secondary dark:bg-dark-secondary dark:text-white'
            value={displayOption.viewMode}
            onChange={handleViewModeChange}
          >
            <option value={ViewMode.Day}>Day</option>
            <option value={ViewMode.Week}>Week</option>
            <option value={ViewMode.Month}>Month</option>
          </select>
        </div>
      </header>

      <div className='overflow-hidden rounded-md bg-white shadow dark:bg-dark-secondary dark:text-white'>
        <div className='timeline'>
          <Gantt
            tasks={ganttTasks}
            {...displayOption}
            columnWidth={displayOption.viewMode === ViewMode.Month ? 150 : 100}
            listCellWidth='100px'
            projectBackgroundColor={isDarkMode ? '#1a202c' : '#808080'}
            projectProgressColor={isDarkMode ? '#2b6cb0' : '#4299e1'}
            projectProgressSelectedColor={isDarkMode ? '#2b6cb0' : '#4299e1'}
          />
        </div>
      </div>
    </div>
  )
};

export default Timeline;