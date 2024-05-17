import dandelion_1 from '@/assets/dandelion/dandelion_1.png';
import dandelion_2 from '@/assets/dandelion/dandelion_2.png';
import dandelion_3 from '@/assets/dandelion/dandelion_3.png';
import dandelion_4 from '@/assets/dandelion/dandelion_4.png';
import dandelion_5 from '@/assets/dandelion/dandelion_5.png';

export function selectDandelion(level: number): string {
  switch (level % 5) {
    case 0:
      return dandelion_5;

    case 1:
      return dandelion_1;

    case 2:
      return dandelion_2;

    case 3:
      return dandelion_3;

    case 4:
      return dandelion_4;

    default:
      return dandelion_1;
  }
}
