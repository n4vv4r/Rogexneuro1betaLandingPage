import Carousel from "../components/Carousel.jsx";

const ECHOS = [
  "/media/echos/01.png",
  "/media/echos/02.png",
  "/media/echos/03.jpg",
];

const PRISMA = [
  "/media/prisma/01.png",
  "/media/prisma/02.png",
  "/media/prisma/03.png",
];

export default function Home() {
  return (
    <main className="home">
      <Carousel slides={ECHOS} label="echOS" />
      <Carousel slides={PRISMA} label="PRISMA" />
      <Carousel gif="/media/echoai/board.gif" label="echoAI" />
    </main>
  );
}
