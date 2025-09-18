"use client";
import { useState } from "react";
export default function Calendar({ selectedDate, setSelectedDate, todos }) {
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
    setViewDate(new Date(today.getFullYear(), today.getMonth(), 1));
    setSelectedDate(today);
  };
  
  // Função para verificar se uma data tem tarefas
  const hasTasksOnDate = (day) => {
    const dateString = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return todos.some(todo => todo.date === dateString);
  };
  
  // Função para verificar se é o dia selecionado
  const isSelectedDay = (day) => {
    return selectedDate.getDate() === day &&
           selectedDate.getMonth() === currentMonth &&
           selectedDate.getFullYear() === currentYear;
  };
  
  // Selecionar um dia
  const selectDay = (day) => {
    setSelectedDate(new Date(currentYear, currentMonth, day));
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
     
      days.push(
        <div
          key={day}
          className={`calendar-day
            ${isSelectedDay(day) ? 'selected' : ''}
            ${hasTasksOnDate(day) ? 'has-tasks' : ''}
            ${isToday ? 'today' : ''}
          `}
          onClick={() => selectDay(day)}
        >
          {day}
        </div>
      );
    }
    return days;
  };
  
  return (
    <div className="calendar">
      <div className="calendar-header">
        <div className="calendar-navigation">
          <button onClick={previousMonth} className="nav-btn">←</button>
          <h2>{monthNames[currentMonth]} {currentYear}</h2>
          <button onClick={nextMonth} className="nav-btn">→</button>
        </div>
        <button onClick={goToToday} className="today-btn">Hoje</button>
      </div>
     
      <div className="calendar-weekdays">
        <div>Dom</div>
        <div>Seg</div>
        <div>Ter</div>
        <div>Qua</div>
        <div>Qui</div>
        <div>Sex</div>
        <div>Sáb</div>
      </div>
     
      <div className="calendar-grid">
        {renderDays()}
      </div>
    </div>
  );
}