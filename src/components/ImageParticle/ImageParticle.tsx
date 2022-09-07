import './ImageParticle.css';
import { ReactElement, useEffect, useState } from 'react';
import { Item } from '../../typings/Item';
import { Message } from '../../typings/Message';

interface Props {
  item: Item;
  tierId: string;
  messages: Message[];
  quadrantNumber: number;
  command: string;
  triggerPreview?: boolean;
  imgUrl?: string;
}

interface imageParticleState {
  grids: Array<Array<any>>;
  ctx: any;
}
export default function ImageParticle({
  item,
  messages,
  tierId,
  quadrantNumber,
  imgUrl,
  triggerPreview,
}: Props): ReactElement {
  const [grid, setGrid] = useState<imageParticleState['grids']>([]);
  const [ctx, setCtx] = useState<imageParticleState['ctx']>(null);
  const png = new Image();
  png.crossOrigin = 'anonymous';

  const drawScene = () => {
    const canvas = document.getElementById(`${item._id}${tierId}`) as any;
    if (canvas) {
      const ctx2 = canvas.getContext('2d');
      setCtx(ctx2);
      canvas.width = png.width;
      canvas.height = png.height;

      ctx2.drawImage(png, 0, 0);

      const data = ctx2.getImageData(0, 0, png.width, png.height);
      ctx2.clearRect(0, 0, canvas.width, canvas.height);

      const particles: any[] = [];
      for (let y = 0, y2 = data.height; y < y2; y++) {
        for (let x = 0, x2 = data.width; x < x2; x++) {
          const pixelIndex = y * 4 * data.width + x * 4 + 3;
          const particle = {
            x: x,
            y: y,
            color: `rgba(${data.data[pixelIndex + 1]},${
              data.data[pixelIndex + 2]
            },${data.data[pixelIndex + 3]},${data.data[pixelIndex + 4]})`,
          };
          particles.push(particle);
        }
      }
      const quarterNumber = quadrantNumber;
      const pixelWidth = parseInt(`${data.width / quarterNumber}`);
      const pixelHeight = parseInt(`${data.height / quarterNumber}`);
      let pxielWidthVariant = 0;
      let pxielheightVariant = 0;
      for (let index = 1; index <= quarterNumber; index++) {
        pxielWidthVariant = 0;
        for (let index2 = 1; index2 <= quarterNumber; index2++) {
          const cuadrant = [];
          for (let i = 0, j = particles.length; i < j; i++) {
            const particle = particles[i];
            if (
              particle.x >= pxielWidthVariant &&
              particle.x <= pxielWidthVariant + pixelWidth &&
              particle.y >= pxielheightVariant &&
              particle.y <= pxielheightVariant + pixelHeight
            ) {
              cuadrant.push(particle);
            }
          }
          grid.push(cuadrant);
          pxielWidthVariant = pxielWidthVariant + pixelWidth;
        }
        pxielheightVariant = pxielheightVariant + pixelHeight;
      }
    }
  };
  useEffect(() => {
    setTimeout(() => {
      png.onload = drawScene;
      png.src = imgUrl ? imgUrl : `http://localhost:4000/${item.image}`;
    }, 100);
  }, []);
  useEffect(() => {
    const messageSelected = messages[messages.length - 1];
    if (messageSelected) {
      if (messageSelected.tier.id.toString() === tierId) {
        handleAddGrid();
      }
    }
  }, [messages]);

  useEffect(() => {
    if (triggerPreview) {
      setTimeout(() => {
        applyPreview();
      }, 1000);
    }
  }, [triggerPreview]);

  const applyPreview = () => {
    const idInterval = setInterval(() => {
      if (grid.length <= 0) {
        clearInterval(idInterval);
      } else {
        handleAddGrid();
      }
    }, 200);
  };

  const handleAddGrid = () => {
    if (grid.length <= 0) return;
    const indexRandom = Math.floor(Math.random() * grid.length);
    const quadrant = grid[indexRandom];
    if (!quadrant) return;
    if (!ctx) return;
    for (let index2 = 0; index2 < quadrant.length; index2++) {
      const particle = quadrant[index2];
      ctx.fillStyle = particle.color;
      ctx.fillRect(particle.x, particle.y, 1, 1);
    }
    grid.splice(indexRandom, 1);
  };
  return (
    <div className="containerImageParticle">
      <canvas id={`${item._id}${tierId}`} className="canvas"></canvas>
    </div>
  );
}
