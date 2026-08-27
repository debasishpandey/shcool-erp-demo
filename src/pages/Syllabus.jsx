import React, { useState, useMemo } from 'react';
import { BookOpen, ChevronDown, ChevronRight, CheckCircle2, Clock, AlertTriangle, Filter, BarChart2 } from 'lucide-react';
import { syllabusMockData, getSyllabusProgress } from '../data/syllabusMockData';

export default function Syllabus() {
  const [selectedClass, setSelectedClass] = useState('All');
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [expandedEntry, setExpandedEntry] = useState(null);
  const [viewMode, setViewMode] = useState('principal'); // principal | classTeacher | subjectTeacher

  // Derive unique filter options
  const allClasses = useMemo(() => [...new Set(syllabusMockData.map(s => `${s.class}-${s.section}`))], []);
  const allSubjects = useMemo(() => [...new Set(syllabusMockData.map(s => s.subject))], []);

  // Filter data
  const filteredData = useMemo(() => {
    let data = syllabusMockData;
    if (selectedClass !== 'All') {
      const [cls, sec] = selectedClass.split('-');
      data = data.filter(s => s.class === cls && s.section === sec);
    }
    if (selectedSubject !== 'All') {
      data = data.filter(s => s.subject === selectedSubject);
    }
    if (selectedStatus !== 'All') {
      data = data.filter(s => {
        const p = getSyllabusProgress(s);
        if (selectedStatus === 'Behind') return p.behindSchedule;
        if (selectedStatus === 'On Track') return !p.behindSchedule;
        return true;
      });
    }
    return data;
  }, [selectedClass, selectedSubject, selectedStatus]);

  // Class-wise overview for Principal
  const classOverview = useMemo(() => {
    const map = {};
    syllabusMockData.forEach(entry => {
      const key = `${entry.class}-${entry.section}`;
      if (!map[key]) map[key] = { label: key, subjects: [] };
      map[key].subjects.push({ subject: entry.subject, teacher: entry.teacher, ...getSyllabusProgress(entry) });
    });
    return Object.values(map);
  }, []);

  // Overall stats
  const overallStats = useMemo(() => {
    let totalChapters = 0, completedChapters = 0, inProgressChapters = 0, notStartedChapters = 0;
    filteredData.forEach(entry => {
      const p = getSyllabusProgress(entry);
      totalChapters += p.total;
      completedChapters += p.completed;
      inProgressChapters += p.inProgress;
      notStartedChapters += p.notStarted;
    });
    return { totalChapters, completedChapters, inProgressChapters, notStartedChapters, percent: totalChapters > 0 ? Math.round((completedChapters / totalChapters) * 100) : 0 };
  }, [filteredData]);

  const toggleExpand = (idx) => {
    setExpandedEntry(expandedEntry === idx ? null : idx);
  };

  const statusIcon = (status) => {
    if (status === 'Completed') return <CheckCircle2 className="w-4 h-4 text-green-600" />;
    if (status === 'In Progress') return <Clock className="w-4 h-4 text-amber-500" />;
    return <div className="w-4 h-4 rounded-full border-2 border-gray-300" />;
  };

  const statusBadge = (status) => {
    const colors = { Completed: 'bg-green-100 text-green-800', 'In Progress': 'bg-amber-100 text-amber-800', 'Not Started': 'bg-gray-100 text-gray-600' };
    return <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${colors[status] || 'bg-gray-100 text-gray-600'}`}>{status}</span>;
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Syllabus & Curriculum Progress</h1>
          <p className="mt-1 text-md text-gray-500">Track chapter-wise syllabus completion across all classes</p>
        </div>
        {/* View Toggle */}
        <div className="flex gap-2 mt-3 md:mt-0">
          {['principal', 'classTeacher', 'subjectTeacher'].map(mode => (
            <button key={mode} onClick={() => setViewMode(mode)}
              className={`px-3 py-1.5 text-sm font-medium rounded-lg border transition-colors ${viewMode === mode ? 'bg-primary-600 text-white border-primary-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}>
              {mode === 'principal' ? 'Principal' : mode === 'classTeacher' ? 'Class Teacher' : 'Subject Teacher'}
            </button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm text-center">
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Total Chapters</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{overallStats.totalChapters}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm text-center">
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Completed</p>
          <p className="text-3xl font-bold text-green-600 mt-1">{overallStats.completedChapters}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm text-center">
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">In Progress</p>
          <p className="text-3xl font-bold text-amber-500 mt-1">{overallStats.inProgressChapters}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm text-center">
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Not Started</p>
          <p className="text-3xl font-bold text-gray-400 mt-1">{overallStats.notStartedChapters}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm text-center">
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Overall</p>
          <p className={`text-3xl font-bold mt-1 ${overallStats.percent >= 50 ? 'text-green-600' : 'text-red-500'}`}>{overallStats.percent}%</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <Filter className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-semibold text-gray-700">Filters</span>
        </div>
        <div className="flex flex-wrap gap-4">
          <select value={selectedClass} onChange={e => setSelectedClass(e.target.value)}
            className="text-sm border-gray-300 rounded-md bg-white shadow-sm focus:border-primary-500 focus:ring-primary-500 px-3 py-2">
            <option value="All">All Classes</option>
            {allClasses.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <select value={selectedSubject} onChange={e => setSelectedSubject(e.target.value)}
            className="text-sm border-gray-300 rounded-md bg-white shadow-sm focus:border-primary-500 focus:ring-primary-500 px-3 py-2">
            <option value="All">All Subjects</option>
            {allSubjects.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <select value={selectedStatus} onChange={e => setSelectedStatus(e.target.value)}
            className="text-sm border-gray-300 rounded-md bg-white shadow-sm focus:border-primary-500 focus:ring-primary-500 px-3 py-2">
            <option value="All">All Status</option>
            <option value="On Track">On Track</option>
            <option value="Behind">Behind Schedule</option>
          </select>
        </div>
      </div>

      {/* ─── PRINCIPAL VIEW: Class-wise Overview ─── */}
      {viewMode === 'principal' && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-primary-600" /> Class-wise Progress Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {classOverview.map(cls => (
              <div key={cls.label} className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Class {cls.label}</h3>
                <div className="space-y-2">
                  {cls.subjects.map(sub => {
                    const barColor = sub.percent >= 60 ? 'bg-green-500' : sub.percent >= 40 ? 'bg-amber-500' : 'bg-red-500';
                    return (
                      <div key={sub.subject} className="flex items-center gap-3">
                        <span className="text-sm text-gray-700 w-28 truncate">{sub.subject}</span>
                        <div className="flex-1 bg-gray-200 rounded-full h-2.5">
                          <div className={`${barColor} h-2.5 rounded-full transition-all`} style={{ width: `${sub.percent}%` }} />
                        </div>
                        <span className={`text-xs font-bold w-10 text-right ${sub.percent >= 60 ? 'text-green-700' : sub.percent >= 40 ? 'text-amber-700' : 'text-red-600'}`}>{sub.percent}%</span>
                        {sub.behindSchedule && <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0" />}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ─── CLASS TEACHER VIEW ─── */}
      {viewMode === 'classTeacher' && (
        <div className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900">Class Teacher View — VIII-A (Sunita Sharma)</h2>
          <p className="text-sm text-gray-500">All subjects for your assigned class</p>
        </div>
      )}

      {/* ─── SUBJECT TEACHER VIEW ─── */}
      {viewMode === 'subjectTeacher' && (
        <div className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900">Subject Teacher View — Ravi Shankar (Science)</h2>
          <p className="text-sm text-gray-500">Your subject across all assigned classes</p>
        </div>
      )}

      {/* ─── SUBJECT-WISE SYLLABUS LIST ─── */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-900 border-b pb-2">
          {viewMode === 'classTeacher' ? 'Subjects in VIII-A' : viewMode === 'subjectTeacher' ? 'Your Teaching Assignments' : 'Detailed Syllabus'}
        </h2>

        {filteredData.length === 0 ? (
          <div className="bg-white p-8 rounded-xl border border-gray-200 text-center">
            <p className="text-gray-500">No syllabus data matches the current filters.</p>
          </div>
        ) : (
          filteredData.map((entry, idx) => {
            const progress = getSyllabusProgress(entry);
            const isExpanded = expandedEntry === idx;

            return (
              <div key={idx} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                {/* Header row */}
                <button onClick={() => toggleExpand(idx)}
                  className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors text-left">
                  <div className="flex items-center gap-4">
                    {isExpanded ? <ChevronDown className="w-5 h-5 text-gray-500" /> : <ChevronRight className="w-5 h-5 text-gray-500" />}
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-2.5 py-0.5 bg-gray-100 text-gray-800 font-bold rounded-md text-sm">{entry.class}-{entry.section}</span>
                        <span className="text-lg font-semibold text-gray-900">{entry.subject}</span>
                        {progress.behindSchedule && (
                          <span className="flex items-center gap-1 text-xs font-semibold text-red-600 bg-red-50 px-2 py-0.5 rounded-full">
                            <AlertTriangle className="w-3 h-3" /> Behind Schedule
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 mt-1">Teacher: {entry.teacher}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-right hidden sm:block">
                      <p className="text-sm text-gray-500">{progress.completed}/{progress.total} chapters</p>
                      <div className="w-32 bg-gray-200 rounded-full h-2 mt-1">
                        <div className={`h-2 rounded-full ${progress.percent >= 60 ? 'bg-green-500' : progress.percent >= 40 ? 'bg-amber-500' : 'bg-red-500'}`}
                          style={{ width: `${progress.percent}%` }} />
                      </div>
                    </div>
                    <span className={`text-lg font-bold ${progress.percent >= 60 ? 'text-green-600' : progress.percent >= 40 ? 'text-amber-600' : 'text-red-600'}`}>
                      {progress.percent}%
                    </span>
                  </div>
                </button>

                {/* Expanded chapter list */}
                {isExpanded && (
                  <div className="border-t border-gray-200 px-5 pb-5">
                    {/* Mini stats */}
                    <div className="flex gap-6 py-3 text-sm">
                      <span className="text-green-700 font-medium">✓ {progress.completed} Completed</span>
                      <span className="text-amber-600 font-medium">◷ {progress.inProgress} In Progress</span>
                      <span className="text-gray-500 font-medium">○ {progress.notStarted} Not Started</span>
                    </div>

                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200 text-left">
                          <th className="py-2 pr-4 text-gray-500 font-medium w-8">#</th>
                          <th className="py-2 pr-4 text-gray-500 font-medium">Chapter</th>
                          <th className="py-2 pr-4 text-gray-500 font-medium w-32">Status</th>
                          <th className="py-2 text-gray-500 font-medium w-28">Completed</th>
                        </tr>
                      </thead>
                      <tbody>
                        {entry.chapters.map(ch => (
                          <tr key={ch.id} className="border-b border-gray-100 last:border-0">
                            <td className="py-2.5 pr-4 text-gray-400">{ch.id}</td>
                            <td className="py-2.5 pr-4 text-gray-900 flex items-center gap-2">
                              {statusIcon(ch.status)}
                              {ch.name}
                            </td>
                            <td className="py-2.5 pr-4">{statusBadge(ch.status)}</td>
                            <td className="py-2.5 text-gray-500 text-xs">{ch.completionDate || (ch.remarks || '—')}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
