/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';

interface GuestbookEntry {
  id: number;
  name: string;
  city: string;
  specialty: string;
  message: string;
  date: string;
}

export default function App() {
  // Простое состояние для интерактива на странице
  const [calcTemp, setCalcTemp] = useState<string>('15');
  const [calcHumidity, setCalcHumidity] = useState<string>('75');
  const [calcResult, setCalcResult] = useState<string | null>(null);

  // Гостевая книга (записи пользователей)
  const [guestName, setGuestName] = useState('');
  const [guestCity, setGuestCity] = useState('');
  const [guestSpecialty, setGuestSpecialty] = useState('Метеорология (прогноз погоды)');
  const [guestSource, setGuestSource] = useState('От учителя географии');
  const [guestComment, setGuestComment] = useState('');
  const [submitMessage, setSubmitMessage] = useState('');

  const [entries, setEntries] = useState<GuestbookEntry[]>([
    {
      id: 1,
      name: 'Иван Ветров',
      city: 'Санкт-Петербург',
      specialty: 'Метеорология (прогноз погоды)',
      message: 'Привет всем студентам Гидромета! Закончил Метфак в 2023 году, сейчас работаю синоптиком в Пулково. Поступайте, не пожалеете!',
      date: '02.10.2026 14:22',
    },
    {
      id: 2,
      name: 'Анна Морозова',
      city: 'Архангельск',
      specialty: 'Океанология (исследование морей)',
      message: 'Мечтаю поехать в экспедицию в Арктику на судне. Спасибо за подробную информацию о баллах ЕГЭ.',
      date: '04.10.2026 19:05',
    },
    {
      id: 3,
      name: 'Сергей Речнов',
      city: 'Великий Новгород',
      specialty: 'Гидрология суши (реки и озера)',
      message: 'Сайт очень понятный, сразу видно — делали для людей, без лишних свистелок! Всем гидрологам пламенный салют.',
      date: '05.10.2026 11:40',
    },
  ]);

  const handleCalculateDewPoint = (e: React.FormEvent) => {
    e.preventDefault();
    const t = parseFloat(calcTemp);
    const rh = parseFloat(calcHumidity);
    if (isNaN(t) || isNaN(rh)) {
      setCalcResult('Ошибка: введите числа!');
      return;
    }
    // Приближенная формула Магнуса для расчета точки росы
    const a = 17.27;
    const b = 237.7;
    const alpha = (a * t) / (b + t) + Math.log(rh / 100);
    const dp = (b * alpha) / (a - alpha);
    setCalcResult(
      `Результат расчета синоптика: Точка росы = ${dp.toFixed(1)} °C. При понижении температуры до этой отметки выпадет роса или образуется туман!`
    );
  };

  const handleGuestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) {
      alert('Пожалуйста, введите ваше имя!');
      return;
    }
    const newEntry: GuestbookEntry = {
      id: Date.now(),
      name: guestName,
      city: guestCity || 'Не указан',
      specialty: guestSpecialty,
      message: guestComment || 'Привет университету РГГМУ!',
      date: new Date().toLocaleDateString('ru-RU') + ' ' + new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
    };

    setEntries([newEntry, ...entries]);
    setGuestName('');
    setGuestCity('');
    setGuestComment('');
    setSubmitMessage('Спасибо! Ваша запись успешно добавлена в таблицу ниже.');
    setTimeout(() => setSubmitMessage(''), 6000);
  };

  return (
    <div>
      {/* ШАПКА САЙТА В ТЕГАХ CENTER */}
      <center>
        <img
          src="/images/logo.svg"
          alt="Официальная эмблема РГГМУ"
          width="130"
          height="130"
          style={{ border: '1px solid black' }}
        />
        <h1>РОССИЙСКИЙ ГОСУДАРСТВЕННЫЙ ГИДРОМЕТЕОРОЛОГИЧЕСКИЙ УНИВЕРСИТЕТ</h1>
        <h2>(РГГМУ — «ГИДРОМЕТ»)</h2>
        <p>
          <b>
            <i>Первый в мире специализированный гидрометеорологический университет. Основан в 1930 году.</i>
          </b>
        </p>
        <p>
          г. Санкт-Петербург, Малоохтинский проспект, дом 98 (станция метро «Новочеркасская»)
        </p>
      </center>

      <hr />

      {/* БЕГУЩАЯ СТРОКА */}
      <div
        style={{
          backgroundColor: '#ffffcc',
          border: '1px solid #cccccc',
          padding: '4px',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
        }}
      >
        {/* Анимация marquee или бегущий текст */}
        <div
          style={{
            display: 'inline-block',
            animation: 'marqueeAnim 25s linear infinite',
          }}
        >
          *** ДОБРО ПОЖАЛОВАТЬ НА СТРАНИЦУ РГГМУ! *** ПРИЕМ АБИТУРИЕНТОВ НА 2026/2027 УЧЕБНЫЙ ГОД ОТКРЫТ ***
          ТЕКУЩАЯ ПОГОДА В САНКТ-ПЕТЕРБУРГЕ: ОБЛАЧНО, ВЕТЕР ЮЖНЫЙ 5 М/С, ТЕМПЕРАТУРА +14°C ***
          НАУЧНО-ИССЛЕДОВАТЕЛЬСКОЕ СУДНО «ВАЛЕРИАН УРЫВАЕВ» ВЫШЛО В РЕЙС ПО ЛАДОЖСКОМУ ОЗЕРУ ***
        </div>
      </div>

      <hr />

      {/* НАВИГАЦИОННАЯ ТАБЛИЦА */}
      <table width="100%" border={1} cellPadding={6} cellSpacing={2}>
        <tbody>
          <tr>
            <th colSpan={7}>ОСНОВНОЕ МЕНЮ САЙТА (НАЖМИТЕ ДЛЯ ПЕРЕХОДА)</th>
          </tr>
          <tr>
            <td align="center">
              <a href="#about">1. О ВУЗе</a>
            </td>
            <td align="center">
              <a href="#faculties">2. Факультеты</a>
            </td>
            <td align="center">
              <a href="#meteo">3. Метеостанция</a>
            </td>
            <td align="center">
              <a href="#ship">4. Экспедиции</a>
            </td>
            <td align="center">
              <a href="#abiturient">5. Поступление</a>
            </td>
            <td align="center">
              <a href="#guestbook">6. Гостевая книга</a>
            </td>
            <td align="center">
              <a href="#contacts">7. Контакты</a>
            </td>
          </tr>
        </tbody>
      </table>

      <br />

      {/* РАЗДЕЛ 1: О ВУЗЕ */}
      <h2 id="about">1. Общая информация об университете РГГМУ</h2>
      <p style={{ textAlign: 'justify' }}>
        <b>Российский государственный гидрометеорологический университет (РГГМУ)</b> — старейшее и единственное в
        Российской Федерации высшее учебное заведение гидрометеорологического профиля. Университет был основан 23 июля
        1930 года в Москве по постановлению ЦИК и СНК СССР, а в 1944 году переведен в освобожденный от блокады
        Ленинград. За почти сто лет существования вуз подготовил десятки тысяч квалифицированных специалистов для
        Росгидромета, Академии наук, Министерства природных ресурсов и международных экологических организаций.
      </p>

      <center>
        <img
          src="/images/building.svg"
          alt="Главный корпус РГГМУ на Малоохтинском проспекте"
          width="420"
          height="250"
          style={{ border: '2px solid black' }}
        />
        <br />
        <small>
          <b>Рис. 1. Главный учебный корпус РГГМУ (Санкт-Петербург, Малоохтинский пр., д. 98)</b>
        </small>
      </center>

      <p>
        <b>Главные факты и достижения нашего университета:</b>
      </p>
      <ul>
        <li>
          <b>Статус Регионального учебного центра ВМО:</b> Университет официально аккредитован Всемирной
          Метеорологической Организацией (ВМО / WMO, специализированное учреждение ООН).
        </li>
        <li>
          <b>Уникальные специальности:</b> Только здесь можно комплексно изучать физику атмосферы, динамику Мирового
          океана, русловые процессы рек, экологический мониторинг и полярную гидрометеорологию.
        </li>
        <li>
          <b>Международное признание:</b> В университете обучаются студенты более чем из 40 стран мира (Африка, Азия,
          Латинская Америка, страны СНГ).
        </li>
        <li>
          <b>Собственные базы практик:</b> Геодезическая и гидрологическая база в Даймище (Ленинградская обл.), морская
          база на о. Валаам (Ладожское озеро) и научно-исследовательские суда.
        </li>
      </ul>

      <hr />

      {/* РАЗДЕЛ 2: ФАКУЛЬТЕТЫ */}
      <h2 id="faculties">2. Факультеты и институты университета</h2>
      <p>
        В составе РГГМУ работают ведущие факультеты и институты, обеспечивающие полный цикл высшего образования
        (бакалавриат, специалитет, магистратура и аспирантура):
      </p>

      <table width="100%" border={1} cellPadding={5} cellSpacing={1}>
        <thead>
          <tr>
            <th style={{ width: '5%' }}>№</th>
            <th style={{ width: '25%' }}>Подразделение</th>
            <th style={{ width: '35%' }}>Направления подготовки</th>
            <th style={{ width: '35%' }}>Где работают выпускники</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td align="center">1</td>
            <td>
              <b>Метеорологический факультет</b>
            </td>
            <td>
              • Метеорология и климатология<br />
              • Авиационная метеорология<br />
              • Физика атмосферы и околоземного пространства
            </td>
            <td>
              Гидрометцентр России, аэропорты (синоптики Пулково, Шереметьево), телеканалы, арктические и
              антарктические полярные станции.
            </td>
          </tr>
          <tr>
            <td align="center">2</td>
            <td>
              <b>Гидрологический факультет</b>
            </td>
            <td>
              • Гидрология суши<br />
              • Водные ресурсы и русловые процессы<br />
              • Гидрографические изыскания
            </td>
            <td>
              Гидроэлектростанции (РусГидро), проектные институты плотин и дамб (Комплекс защитных сооружений СПб от
              наводнений), мониторинг рек и озер.
            </td>
          </tr>
          <tr>
            <td align="center">3</td>
            <td>
              <b>Океанологический факультет</b>
            </td>
            <td>
              • Физическая океанология<br />
              • Морские природные ресурсы<br />
              • Шельфовые исследования
            </td>
            <td>
              Институт океанологии им. Ширшова РАН, морской торговый флот, нефтегазовые шельфовые платформы,
              экспедиции в Северный Ледовитый океан.
            </td>
          </tr>
          <tr>
            <td align="center">4</td>
            <td>
              <b>Институт информационных систем и геотехнологий (ИИСГ)</b>
            </td>
            <td>
              • Прикладная информатика<br />
              • Геоинформационные системы (ГИС)<br />
              • Дистанционное зондирование Земли из космоса
            </td>
            <td>
              Яндекс Карты, Роскосмос, разработчики геопорталов, аналитики спутниковых снимков погоды, IT-компании.
            </td>
          </tr>
          <tr>
            <td align="center">5</td>
            <td>
              <b>Экологический факультет</b>
            </td>
            <td>
              • Экология и природопользование<br />
              • Геоэкология<br />
              • Охрана водных и атмосферных бассейнов
            </td>
            <td>
              Росприроднадзор, отделы экологии промышленных предприятий, экологические лаборатории и заповедники.
            </td>
          </tr>
          <tr>
            <td align="center">6</td>
            <td>
              <b>Институт гидрологии и океанологии</b>
            </td>
            <td>
              • Фундаментальные научные исследования<br />
              • Комплексное изучение водных экосистем
            </td>
            <td>
              Академические НИИ, международные комиссии по защите Балтийского моря (ХЕЛКОМ).
            </td>
          </tr>
        </tbody>
      </table>

      <hr />

      {/* РАЗДЕЛ 3: МЕТЕОСТАНЦИЯ И КАРТА */}
      <h2 id="meteo">3. Учебная метеостанция и оперативная синоптическая карта</h2>
      <p style={{ textAlign: 'justify' }}>
        Студенты РГГМУ уже с первого курса работают с настоящими профессиональными приборами: психрометрами,
        термографами, барографами, анеморумбометрами и осадкомерами Третьякова на университетской метеоплощадке.
      </p>

      <table width="100%" border={1} cellPadding={8} cellSpacing={2}>
        <tbody>
          <tr>
            <td width="50%" align="center" valign="top">
              <b>Метеорологическая площадка РГГМУ</b>
              <br />
              <img
                src="/images/meteo.svg"
                alt="Метеорологические приборы: будка, флюгер, зонд"
                width="320"
                height="200"
                style={{ border: '1px solid black' }}
              />
              <br />
              <small>
                <i>Приборы: психрометрическая будка, флюгер Вильда, мачта с датчиками ветра и запуск радиозонда</i>
              </small>
            </td>
            <td width="50%" align="center" valign="top">
              <b>Оперативная синоптическая карта СЗФО</b>
              <br />
              <img
                src="/images/weather_map.svg"
                alt="Синоптическая карта погоды Санкт-Петербурга"
                width="320"
                height="200"
                style={{ border: '1px solid black' }}
              />
              <br />
              <small>
                <i>Карта погоды: циклон над Балтикой, прохождение атмосферного фронта через Санкт-Петербург</i>
              </small>
            </td>
          </tr>
        </tbody>
      </table>

      <br />

      {/* ИНТЕРАКТИВНЫЙ РАСЧЕТ ДЛЯ СТУДЕНТА-СИНОПТИКА */}
      <table width="100%" border={1} cellPadding={8} cellSpacing={0}>
        <tbody>
          <tr>
            <th align="left">
              ПРАКТИЧЕСКИЙ ТРЕНАЖЕР ДЛЯ СТУДЕНТА: РАСЧЕТ ТОЧКИ РОСЫ ПО ФОРМУЛЕ МАГНУСА
            </th>
          </tr>
          <tr>
            <td>
              <form onSubmit={handleCalculateDewPoint}>
                <p>
                  Введите текущую температуру воздуха (°C):{' '}
                  <input
                    type="text"
                    size={6}
                    value={calcTemp}
                    onChange={(e) => setCalcTemp(e.target.value)}
                  />
                  &nbsp;&nbsp;&nbsp;&nbsp; Относительную влажность (%):{' '}
                  <input
                    type="text"
                    size={6}
                    value={calcHumidity}
                    onChange={(e) => setCalcHumidity(e.target.value)}
                  />
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <input type="submit" value="Вычислить точку росы" />
                </p>
              </form>
              {calcResult && (
                <p>
                  <b>
                    <span style={{ color: '#000080' }}>{calcResult}</span>
                  </b>
                </p>
              )}
              <small>
                <i>Справка: Точка росы — это температура, до которой должен охладиться воздух, чтобы содержащийся в нем пар достиг состояния насыщения.</i>
              </small>
            </td>
          </tr>
        </tbody>
      </table>

      <hr />

      {/* РАЗДЕЛ 4: ФЛОТ И ЭКСПЕДИЦИИ */}
      <h2 id="ship">4. Научно-исследовательский флот и полевые практики</h2>
      <p style={{ textAlign: 'justify' }}>
        Студенты-океанологи и гидрологи РГГМУ проходят учебные и производственные практики на реальных водоемах России.
        Университет располагает научно-исследовательским судном <b>«Профессор Валериан Урываев»</b>, названным в честь
        выдающегося советского гидролога и профессора нашего института.
      </p>

      <center>
        <img
          src="/images/ship.svg"
          alt="Научно-исследовательское экспедиционное судно РГГМУ"
          width="360"
          height="200"
          style={{ border: '2px solid black' }}
        />
        <br />
        <small>
          <b>Рис. 2. Научно-исследовательское судно «Профессор Валериан Урываев» во время экспедиции на Ладоге</b>
        </small>
      </center>

      <p>
        <b>Программа студенческих экспедиций по курсам:</b>
      </p>
      <ol>
        <li>
          <b>1 курс (Даймище, река Оредеж):</b> Топографическая съемка, гидрометрическая вертушка, замер скорости
          течения и расхода воды в реке.
        </li>
        <li>
          <b>2 курс (Ладожское озеро, остров Валаам):</b> Озерная гидрология, замеры прозрачности диском Секки,
          термический режим глубоких слоев воды.
        </li>
        <li>
          <b>3 курс (Балтийское и Белое моря):</b> Работа на борту судна, батометрические пробы морской воды,
          исследование течений акустическими доплеровскими профилографами (ADCP).
        </li>
        <li>
          <b>4 курс (Полярные экспедиции):</b> Арктический плавучий университет, экспедиции в Баренцево и Карское
          моря, преддипломная практика.
        </li>
      </ol>

      <hr />

      {/* РАЗДЕЛ 5: АБИТУРИЕНТУ */}
      <h2 id="abiturient">5. Информация для абитуриентов (Поступление 2026)</h2>
      <p>
        Приемная комиссия РГГМУ приглашает выпускников 11-х классов и колледжей на обучение на бюджетной основе!
      </p>

      <table width="100%" border={1} cellPadding={6} cellSpacing={1}>
        <thead>
          <tr>
            <th>Направление</th>
            <th>Обязательные предметы ЕГЭ</th>
            <th>Предмет по выбору</th>
            <th>Бюджетных мест</th>
            <th>Проходной балл (2025 г.)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <b>05.03.04 Гидрометеорология</b>
            </td>
            <td>Русский язык, Профильная математика</td>
            <td>География / Физика / Информатика</td>
            <td align="center">145</td>
            <td align="center">172</td>
          </tr>
          <tr>
            <td>
              <b>05.03.05 Прикладная гидрометеорология</b>
            </td>
            <td>Русский язык, Профильная математика</td>
            <td>География / Физика</td>
            <td align="center">60</td>
            <td align="center">168</td>
          </tr>
          <tr>
            <td>
              <b>05.03.06 Экология и природопользование</b>
            </td>
            <td>Русский язык, География</td>
            <td>Биология / Профильная математика</td>
            <td align="center">45</td>
            <td align="center">185</td>
          </tr>
          <tr>
            <td>
              <b>09.03.02 Информационные системы и технологии</b>
            </td>
            <td>Русский язык, Профильная математика</td>
            <td>Информатика / Физика</td>
            <td align="center">40</td>
            <td align="center">215</td>
          </tr>
        </tbody>
      </table>

      <p>
        <b>Общежитие:</b> Всем иногородним студентам очной формы обучения предоставляется общежитие коридорного и
        блочного типа в Красногвардейском и Невском районах СПб (ул. Стахановцев, пр. Большеохтинский, ул. Воронежская).
      </p>

      <hr />

      {/* РАЗДЕЛ 6: ГОСТЕВАЯ КНИГА И АНКЕТА */}
      <h2 id="guestbook">6. Гостевая книга и анкета абитуриента / посетителя сайта</h2>
      <p>
        Оставьте запись о себе, задайте вопрос приемной комиссии или поприветствуйте студентов и преподавателей РГГМУ!
      </p>

      {/* ТАБЛИЦА С ФОРМОЙ */}
      <table width="100%" border={1} cellPadding={8} cellSpacing={2}>
        <tbody>
          <tr>
            <th align="left">ФОРМА ДЛЯ ДОБАВЛЕНИЯ ЗАПИСИ В КНИГУ ОТЗЫВОВ</th>
          </tr>
          <tr>
            <td>
              <form onSubmit={handleGuestSubmit}>
                <table border={0} cellPadding={4} cellSpacing={0}>
                  <tbody>
                    <tr>
                      <td align="right">
                        <b>Ваше Ф.И.О.:</b>
                      </td>
                      <td>
                        <input
                          type="text"
                          size={40}
                          value={guestName}
                          onChange={(e) => setGuestName(e.target.value)}
                          placeholder="Например: Петров Алексей"
                          required
                        />
                      </td>
                    </tr>
                    <tr>
                      <td align="right">
                        <b>Город / Регион:</b>
                      </td>
                      <td>
                        <input
                          type="text"
                          size={40}
                          value={guestCity}
                          onChange={(e) => setGuestCity(e.target.value)}
                          placeholder="Например: г. Вологда"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td align="right">
                        <b>Интересующее направление:</b>
                      </td>
                      <td>
                        <select
                          value={guestSpecialty}
                          onChange={(e) => setGuestSpecialty(e.target.value)}
                        >
                          <option value="Метеорология (прогноз погоды)">Метеорология (прогноз погоды)</option>
                          <option value="Гидрология суши (реки и озера)">Гидрология суши (реки и озера)</option>
                          <option value="Океанология (исследование морей)">Океанология (исследование морей)</option>
                          <option value="Экология и охрана природы">Экология и охрана природы</option>
                          <option value="Геоинформационные системы (IT в погоде)">Геоинформационные системы (IT в погоде)</option>
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <td align="right">
                        <b>Откуда узнали о РГГМУ:</b>
                      </td>
                      <td>
                        <input
                          type="radio"
                          name="source"
                          id="src1"
                          checked={guestSource === 'От учителя географии'}
                          onChange={() => setGuestSource('От учителя географии')}
                        />
                        <label htmlFor="src1">От учителя географии</label>
                        &nbsp;&nbsp;
                        <input
                          type="radio"
                          name="source"
                          id="src2"
                          checked={guestSource === 'Искал прогноз погоды в сети'}
                          onChange={() => setGuestSource('Искал прогноз погоды в сети')}
                        />
                        <label htmlFor="src2">Искал прогноз погоды в сети</label>
                        &nbsp;&nbsp;
                        <input
                          type="radio"
                          name="source"
                          id="src3"
                          checked={guestSource === 'Друзья / Родственники учились'}
                          onChange={() => setGuestSource('Друзья / Родственники учились')}
                        />
                        <label htmlFor="src3">Друзья / Родственники учились</label>
                      </td>
                    </tr>
                    <tr>
                      <td align="right" valign="top">
                        <b>Текст сообщения:</b>
                      </td>
                      <td>
                        <textarea
                          rows={4}
                          cols={50}
                          value={guestComment}
                          onChange={(e) => setGuestComment(e.target.value)}
                          placeholder="Напишите ваш отзыв или вопрос к приемной комиссии..."
                        />
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>
                        <input type="submit" value="Отправить запись в таблицу" />
                        &nbsp;&nbsp;
                        <input
                          type="button"
                          value="Очистить поля"
                          onClick={() => {
                            setGuestName('');
                            setGuestCity('');
                            setGuestComment('');
                          }}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </form>

              {submitMessage && (
                <p>
                  <b>
                    <span style={{ color: '#008000' }}>{submitMessage}</span>
                  </b>
                </p>
              )}
            </td>
          </tr>
        </tbody>
      </table>

      <br />

      {/* ТАБЛИЦА ЗАПИСЕЙ В ГОСТЕВОЙ КНИГЕ */}
      <h3>Записи в гостевой книге (Всего записей: {entries.length}):</h3>
      <table width="100%" border={1} cellPadding={6} cellSpacing={1}>
        <thead>
          <tr>
            <th style={{ width: '15%' }}>Дата и время</th>
            <th style={{ width: '20%' }}>Имя и город</th>
            <th style={{ width: '25%' }}>Выбранное направление</th>
            <th style={{ width: '40%' }}>Сообщение</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr key={entry.id}>
              <td align="center">
                <small>{entry.date}</small>
              </td>
              <td>
                <b>{entry.name}</b>
                <br />
                <small>г. {entry.city}</small>
              </td>
              <td>{entry.specialty}</td>
              <td>{entry.message}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p>
        <small>
          <i>
            Примечание разработчика: база данных Supabase для удаленной синхронизации записей не подключена в данном проекте, записи хранятся локально в сессии страницы.
          </i>
        </small>
      </p>

      <hr />

      {/* РАЗДЕЛ 7: КОНТАКТЫ */}
      <h2 id="contacts">7. Контактные данные и как доехать</h2>
      <table width="100%" border={1} cellPadding={6} cellSpacing={1}>
        <tbody>
          <tr>
            <td width="30%">
              <b>Главный учебный корпус:</b>
            </td>
            <td>195196, Россия, г. Санкт-Петербург, Малоохтинский проспект, дом 98</td>
          </tr>
          <tr>
            <td>
              <b>Проезд на транспорте:</b>
            </td>
            <td>
              Станция метро «Новочеркасская» (выход №7 или №8), далее пешком 7 минут вдоль Малоохтинского парка или
              на трамваях № 10, 23, троллейбусе № 7.
            </td>
          </tr>
          <tr>
            <td>
              <b>Второй учебный корпус:</b>
            </td>
            <td>г. Санкт-Петербург, ул. Воронежская, д. 79 (метро «Обводный канал»)</td>
          </tr>
          <tr>
            <td>
              <b>Телефон приемной комиссии:</b>
            </td>
            <td>+7 (812) 372-50-91 (многоканальный)</td>
          </tr>
          <tr>
            <td>
              <b>Электронная почта:</b>
            </td>
            <td>
              <a href="mailto:priem@rshu.ru">priem@rshu.ru</a> (приемная комиссия),{' '}
              <a href="mailto:rector@rshu.ru">rector@rshu.ru</a> (канцелярия)
            </td>
          </tr>
          <tr>
            <td>
              <b>Дни открытых дверей:</b>
            </td>
            <td>Каждое третье воскресенье месяца в 12:00 в актовом зале Главного корпуса.</td>
          </tr>
        </tbody>
      </table>

      <hr />

      {/* ПОДВАЛ В СТИЛЕ САЙТОВ НАЧАЛА 2000-Х */}
      <center>
        <p>
          <a href="#about">[ Наверх страницы ]</a> &nbsp;|&nbsp;{' '}
          <a href="#faculties">[ Факультеты ]</a> &nbsp;|&nbsp;{' '}
          <a href="#meteo">[ Метеостанция ]</a> &nbsp;|&nbsp;{' '}
          <a href="#guestbook">[ Гостевая книга ]</a> &nbsp;|&nbsp;{' '}
          <a href="#contacts">[ Контакты ]</a>
        </p>

        <p>
          <b>Счетчик посещений веб-страницы:</b>
          <br />
          <img
            src="/images/retro_counter.svg"
            alt="Счетчик посетителей: 004291"
            width="120"
            height="28"
            style={{ border: 'none' }}
          />
        </p>

        <p>
          <img
            src="/images/notepad_button.svg"
            alt="Сайт сверстан в Блокноте"
            width="88"
            height="31"
            style={{ border: '1px solid black' }}
          />
          &nbsp;&nbsp;
          <small>
            <i>Оптимизировано для браузеров с поддержкой HTML 4.01 и разрешения 800x600 и выше</i>
          </small>
        </p>

        <p>
          <small>
            © 1930–2026 Российский государственный гидрометеорологический университет (РГГМУ).
            <br />
            Создано при помощи базовых тегов HTML: table, tr, td, h1, h2, h3, p, b, i, u, font, center, a, img, form,
            input, select, textarea.
          </small>
        </p>
      </center>
    </div>
  );
}
