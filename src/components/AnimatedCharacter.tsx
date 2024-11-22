// import React, { useRef, useEffect } from "react";
// import * as PIXI from "pixi.js";

// const AnimatedCharacter = () => {
//   const pixiAppRef = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     // Создаем приложение PIXI с черным фоном
//     const app = new PIXI.Application({
//       width: 200, // Ширина контейнера
//       height: 200, // Высота контейнера
//       backgroundColor: 0x000000, // Черный фон
//     });

//     // Добавляем сцену PIXI к DOM
//     if (pixiAppRef.current) {
//       pixiAppRef.current.appendChild(app.view);
//     }

//     // Создаем контейнер для персонажа
//     const character = new PIXI.Container();
//     app.stage.addChild(character);

//     // Создаем тело
//     const body = new PIXI.Graphics();
//     body.beginFill(0xffcc00);
//     body.drawRect(-20, -60, 40, 80); // Тело размером 40x80
//     body.endFill();
//     character.addChild(body);

//     // Создаем неподвижную руку
//     const staticArm = new PIXI.Graphics();
//     staticArm.beginFill(0x0000ff);
//     staticArm.drawRect(0, 0, 10, 50); // Рука размером 10x50
//     staticArm.endFill();
//     staticArm.pivot.set(5, 0); // Устанавливаем ось поворота
//     staticArm.position.set(-30, -50); // Позиция руки относительно тела
//     character.addChild(staticArm);

//     // Создаем махающую руку
//     const wavingArm = new PIXI.Graphics();
//     wavingArm.beginFill(0x0000ff);
//     wavingArm.drawRect(0, 0, 10, 50); // Рука размером 10x50
//     wavingArm.endFill();
//     wavingArm.pivot.set(5, 0); // Устанавливаем ось поворота
//     wavingArm.position.set(30, -50); // Позиция махающей руки
//     character.addChild(wavingArm);

//     // Голова
//     const head = new PIXI.Graphics();
//     head.beginFill(0x00ff00);
//     head.drawCircle(0, -80, 20); // Радиус головы - 20
//     head.endFill();
//     character.addChild(head);

//     // Устанавливаем позицию персонажа
//     character.x = app.screen.width / 2; // Центрируем персонажа по горизонтали
//     character.y = app.screen.height / 2; // Центрируем персонажа по вертикали

//     // Анимация махающей руки
//     let step = 0;
//     app.ticker.add(() => {
//       step += 0.1;
//       wavingArm.rotation = Math.sin(step) * 0.5; // Махание рукой
//     });

//     // Очистка приложения при размонтировании
//     return () => {
//       app.destroy(true, true);
//     };
//   }, []);

//   return <div ref={pixiAppRef} style={{ width: "200px", height: "200px" }} />;
// };

// export default AnimatedCharacter;
