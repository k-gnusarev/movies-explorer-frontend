import React from 'react';
import './AboutProject.css';


export default function AboutProject(props) {
  return (
    <section className='about-project'>
      <h2 id='project' className='about-project__title'>О проекте</h2>
      <div className='about-project__text-section'>
        <div className='about-project__text-column'>
          <h3 className='about-project__subtitle'>Дипломный проект включал 5 этапов</h3>
          <p className='about-project__text'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </div>
        <div className='about-project__text-column'>
          <h3 className='about-project__subtitle'>На выполнение диплома ушло 5 недель</h3>
          <p className='about-project__text'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
      </div>
      <div className="about-project__diagram">
        <p className="about-project__diagram-text about-project__diagram-text_bg_black">1 неделя</p>
        <p className="about-project__diagram-text about-project__diagram-text_bg_gray">4 недели</p>
        <p className="about-project__diagram-text about-project__description_text_backend">Back-end</p>
        <p className="about-project__diagram-text about-project__description_text_frontend">Front-end</p>
      </div>
    </section>
  )
};
