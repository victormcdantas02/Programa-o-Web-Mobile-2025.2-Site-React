"use client";
import { useState } from "react";

export default function Calendar({ selectedDate, todos, onDateSelect }) {  
  const today = new Date();
  const [viewDate, setViewDate] = useState(new Date(Date.UTC(today.getFullYear(), today.getMonth(), 1)));
  const [dayTodos, setDayTodos] = useState([]);

  const currentMonth = viewDate.getUTCMonth();
  const currentYear = viewDate.getUTCFullYear();

  const monthNames = [
    "JANEIRO","FEVEREIRO","MARÇO","ABRIL","MAIO","JUNHO",
    "JULHO","AGOSTO","SETEMBRO","OUTUBRO","NOVEMBRO","DEZEMBRO"
  ];

  const previousMonth = () => setViewDate(new Date(Date.UTC(currentYear, currentMonth - 1, 1)));
  const nextMonth = () => setViewDate(new Date(Date.UTC(currentYear, currentMonth + 1, 1)));
  const goToToday = () => {
    const newToday = new Date(Date.UTC(today.getFullYear(), today.getMonth(), 1));
    setViewDate(newToday);
    handleDateSelect(today);
  };

  const sameDay = (d1, d2) =>
    d1.getUTCFullYear() === d2.getUTCFullYear() &&
    d1.getUTCMonth() === d2.getUTCMonth() &&
    d1.getUTCDate() === d2.getUTCDate();

  const handleDateSelect = (date) => {
    onDateSelect && onDateSelect(date);
    const todosDoDia = todos.filter(todo => todo.data && sameDay(new Date(todo.data), date));
    setDayTodos(todosDoDia);
  };

  const hasTasksOnDate = (day) => {
    const dayDate = new Date(Date.UTC(currentYear, currentMonth, day));
    return todos.some(todo => todo.data && sameDay(new Date(todo.data), dayDate));
  };

  const getTaskCountForDate = (day) => {
    const dayDate = new Date(Date.UTC(currentYear, currentMonth, day));
    return todos.filter(todo => todo.data && sameDay(new Date(todo.data), dayDate)).length;
  };

  const getCompletedTasksForDate = (day) => {
    const dayDate = new Date(Date.UTC(currentYear, currentMonth, day));
    return todos.filter(todo => todo.data && sameDay(new Date(todo.data), dayDate) && todo.isCompleted).length;
  };

  const areAllTasksCompleted = (day) => {
    const dayDate = new Date(Date.UTC(currentYear, currentMonth, day));
    const dayTodos = todos.filter(todo => todo.data && sameDay(new Date(todo.data), dayDate));
    return dayTodos.length > 0 && dayTodos.every(todo => todo.isCompleted);
  };

  const isSelectedDay = (day) => sameDay(selectedDate, new Date(Date.UTC(currentYear, currentMonth, day)));
  const isPastDay = (day) => new Date(Date.UTC(currentYear, currentMonth, day)) < new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()));
  const isWeekend = (day) => { const d = new Date(Date.UTC(currentYear, currentMonth, day)); return d.getUTCDay() === 0 || d.getUTCDay() === 6; };
  const selectDay = (day) => handleDateSelect(new Date(Date.UTC(currentYear, currentMonth, day)));

  const renderDays = () => {
    const daysInMonth = new Date(Date.UTC(currentYear, currentMonth + 1, 0)).getUTCDate();
    const firstDay = new Date(Date.UTC(currentYear, currentMonth, 1)).getUTCDay();
    const days = [];

    for (let i = 0; i < firstDay; i++) days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);

    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = sameDay(today, new Date(Date.UTC(currentYear, currentMonth, day)));
      const taskCount = getTaskCountForDate(day);
      const completedCount = getCompletedTasksForDate(day);
      const allCompleted = areAllTasksCompleted(day);
      const past = isPastDay(day);
      const weekend = isWeekend(day);

      days.push(
        <div
          key={day}
          className={`calendar-day
            ${isSelectedDay(day) ? 'selected' : ''}
            ${hasTasksOnDate(day) ? 'has-tasks' : ''}
            ${allCompleted ? 'all-completed' : ''}
            ${isToday ? 'today' : ''}
            ${past ? 'past-day' : ''}
            ${weekend ? 'weekend' : ''}
          `}
          onClick={() => selectDay(day)}
          title={`${day} de ${monthNames[currentMonth].toLowerCase()}, ${currentYear}
            ${taskCount > 0 ? `\n${taskCount} tarefa(s) - ${completedCount} concluída(s)` : '\nNenhuma tarefa'}
          `}
        >
          <span className="day-number">{day}</span>
          {taskCount > 0 && (
            <div className="task-indicators">
              <span className={`task-count ${allCompleted ? 'completed' : ''}`}>{taskCount}</span>
              {taskCount > 1 && completedCount > 0 && !allCompleted && (
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${(completedCount / taskCount) * 100}%` }}></div>
                </div>
              )}
            </div>
          )}
        </div>
      );
    }
    return days;
  };

  const getMonthStats = () => {
    const monthTodos = todos.filter(todo => {
      const d = new Date(todo.data);
      return d.getUTCFullYear() === currentYear && d.getUTCMonth() === currentMonth;
    });
    const completed = monthTodos.filter(todo => todo.isCompleted).length;
    const total = monthTodos.length;
    return { total, completed, pending: total - completed };
  };

  const monthStats = getMonthStats();

  return (
    <div className="calendar">
      <div className="calendar-header">
        <div className="calendar-navigation">
          <button onClick={previousMonth} className="nav-btn" title="Mês anterior">←</button>
          <div className="month-info">
            <h2>{monthNames[currentMonth]} {currentYear}</h2>
            {monthStats.total > 0 && (
              <div className="month-stats">
                <span className="stat">{monthStats.total} tarefas</span>
                <span className="stat completed">{monthStats.completed} concluídas</span>
              </div>
            )}
          </div>
          <button onClick={nextMonth} className="nav-btn" title="Próximo mês">→</button>
        </div>
        <button onClick={goToToday} className="today-btn">Hoje</button>
      </div>

      <div className="calendar-legend">
        <div className="legend-item"><div className="legend-color today-legend"></div><span>Hoje</span></div>
        <div className="legend-item"><div className="legend-color has-tasks-legend"></div><span>Com tarefas</span></div>
        <div className="legend-item"><div className="legend-color completed-legend"></div><span>Concluídas</span></div>
      </div>

      <div className="calendar-weekdays">
        <div>Dom</div><div>Seg</div><div>Ter</div><div>Qua</div>
        <div>Qui</div><div>Sex</div><div>Sáb</div>
      </div>

      <div className="calendar-grid">{renderDays()}</div>

      <div className="selected-day-todos mt-4">
        <h3>Tarefas de {selectedDate.toLocaleDateString("pt-BR")}:</h3>
        {dayTodos.length === 0 ? (
          <p>Nenhuma tarefa neste dia.</p>
        ) : (
          <ul>
            {dayTodos.map(todo => (
              <li key={todo.id} className={todo.isCompleted ? 'completed-text' : ''}>
                {todo.text} {todo.isCompleted ? "(Concluída)" : ""}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
