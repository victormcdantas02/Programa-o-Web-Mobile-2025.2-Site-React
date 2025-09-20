"use client";
import { useState } from "react";

export default function Calendar({ selectedDate, setSelectedDate, todos, onDateSelect }) {
  const today = new Date();
 
  // Estados para controlar o mês/ano exibido
  const [viewDate, setViewDate] = useState(new Date(2025, 9, 1)); // começa em outubro 2025
 
  const currentMonth = viewDate.getMonth();
  const currentYear = viewDate.getFullYear();
 
  // Nomes dos meses
  const monthNames = [
    "JANEIRO", "FEVEREIRO", "MARÇO", "ABRIL", "MAIO", "JUNHO",
    "JULHO", "AGOSTO", "SETEMBRO", "OUTUBRO", "NOVEMBRO", "DEZEMBRO"
  ];
 
  // Função para ir para o mês anterior
  const previousMonth = () => {
    setViewDate(new Date(currentYear, currentMonth - 1, 1));
  };
 
  // Função para ir para o próximo mês
  const nextMonth = () => {
    setViewDate(new Date(currentYear, currentMonth + 1, 1));
  };
 
  // Função para voltar ao mês atual
  const goToToday = () => {
    const todayDate = new Date();
    setViewDate(new Date(todayDate.getFullYear(), todayDate.getMonth(), 1));
    setSelectedDate(todayDate);
  };
 
  // Função para verificar se uma data tem tarefas
  const hasTasksOnDate = (day) => {
    const dateString = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return todos.some(todo => todo.date === dateString);
  };

  // Função para contar tarefas em uma data específica
  const getTaskCountForDate = (day) => {
    const dateString = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return todos.filter(todo => todo.date === dateString).length;
  };

  // Função para contar tarefas concluídas em uma data específica
  const getCompletedTasksForDate = (day) => {
    const dateString = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return todos.filter(todo => todo.date === dateString && todo.isCompleted).length;
  };

  // Função para verificar se todas as tarefas do dia estão concluídas
  const areAllTasksCompleted = (day) => {
    const dateString = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const dayTodos = todos.filter(todo => todo.date === dateString);
    return dayTodos.length > 0 && dayTodos.every(todo => todo.isCompleted);
  };
 
  // Função para verificar se é o dia selecionado
  const isSelectedDay = (day) => {
    return selectedDate.getDate() === day &&
           selectedDate.getMonth() === currentMonth &&
           selectedDate.getFullYear() === currentYear;
  };

  // Função para verificar se é um dia passado
  const isPastDay = (day) => {
    const dayDate = new Date(currentYear, currentMonth, day);
    const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return dayDate < todayDate;
  };

  // Função para verificar se é fim de semana
  const isWeekend = (day) => {
    const dayOfWeek = new Date(currentYear, currentMonth, day).getDay();
    return dayOfWeek === 0 || dayOfWeek === 6; // Domingo ou Sábado
  };
 
  // Selecionar um dia
  const selectDay = (day) => {
    const newSelectedDate = new Date(currentYear, currentMonth, day);
    setSelectedDate(newSelectedDate);
    
    // Callback opcional para quando uma data é selecionada
    if (onDateSelect) {
      onDateSelect(newSelectedDate);
    }
  };
 
  // Gerar os dias do mês
  const renderDays = () => {
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const days = [];
   
    // Dias vazios do início
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }
   
    // Dias do mês
    for (let day = 1; day <= daysInMonth; day++) {
      // Verificar se é hoje (dia atual real)
      const isToday = today.getDate() === day &&
                     today.getMonth() === currentMonth &&
                     today.getFullYear() === currentYear;

      const taskCount = getTaskCountForDate(day);
      const completedCount = getCompletedTasksForDate(day);
      const allCompleted = areAllTasksCompleted(day);
      const isPast = isPastDay(day);
      const weekend = isWeekend(day);
     
      days.push(
        <div
          key={day}
          className={`calendar-day
            ${isSelectedDay(day) ? 'selected' : ''}
            ${hasTasksOnDate(day) ? 'has-tasks' : ''}
            ${allCompleted ? 'all-completed' : ''}
            ${isToday ? 'today' : ''}
            ${isPast ? 'past-day' : ''}
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
              <span className={`task-count ${allCompleted ? 'completed' : ''}`}>
                {taskCount}
              </span>
              {taskCount > 1 && completedCount > 0 && !allCompleted && (
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${(completedCount / taskCount) * 100}%` }}
                  ></div>
                </div>
              )}
            </div>
          )}
        </div>
      );
    }
    return days;
  };

  // Função para obter estatísticas do mês atual
  const getMonthStats = () => {
    const monthStart = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-01`;
    const monthEnd = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-31`;
    
    const monthTodos = todos.filter(todo => todo.date >= monthStart && todo.date <= monthEnd);
    const completed = monthTodos.filter(todo => todo.isCompleted).length;
    const total = monthTodos.length;
    
    return { total, completed, pending: total - completed };
  };

  const monthStats = getMonthStats();
 
  return (
    <div className="calendar">
      {/* Header com navegação e estatísticas */}
      <div className="calendar-header">
        <div className="calendar-navigation">
          <button onClick={previousMonth} className="nav-btn" title="Mês anterior">
            ←
          </button>
          <div className="month-info">
            <h2>{monthNames[currentMonth]} {currentYear}</h2>
            {monthStats.total > 0 && (
              <div className="month-stats">
                <span className="stat">{monthStats.total} tarefas</span>
                <span className="stat completed">{monthStats.completed} concluídas</span>
              </div>
            )}
          </div>
          <button onClick={nextMonth} className="nav-btn" title="Próximo mês">
            →
          </button>
        </div>
        <button onClick={goToToday} className="today-btn">
          Hoje
        </button>
      </div>

      {/* Legenda */}
      <div className="calendar-legend">
        <div className="legend-item">
          <div className="legend-color today-legend"></div>
          <span>Hoje</span>
        </div>
        <div className="legend-item">
          <div className="legend-color has-tasks-legend"></div>
          <span>Com tarefas</span>
        </div>
        <div className="legend-item">
          <div className="legend-color completed-legend"></div>
          <span>Concluídas</span>
        </div>
      </div>
     
      {/* Dias da semana */}
      <div className="calendar-weekdays">
        <div>Dom</div>
        <div>Seg</div>
        <div>Ter</div>
        <div>Qua</div>
        <div>Qui</div>
        <div>Sex</div>
        <div>Sáb</div>
      </div>
     
      {/* Grid do calendário */}
      <div className="calendar-grid">
        {renderDays()}
      </div>
    </div>
  );
}