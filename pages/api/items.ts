/* eslint-disable react-hooks/rules-of-hooks */
import { NextApiHandler } from 'next';
import { useEffect } from 'react';

const handler: NextApiHandler = async (req: any, res: any) => {
  console.log(req.body);
  const path = req.body;
  const rePath = path.substr(4);
  console.log(rePath);
  const dataRes = await fetch(
    `${process.env.NEXT_PUBLIC_PROTEIN_DATA}/items/`
  );
  console.log(dataRes);
  const body = await dataRes.json();
  res.status(200).json(body);

  useEffect(() => {
    if (rePath) {
      const handler = async () => {
        //カテゴリ選択・フレーバー選択された時に表示
        const dataRes = await fetch(
          `${process.env.NEXT_PUBLIC_PROTEIN_DATA}/items/${rePath}`
        );
        const body = await dataRes.json();
        res.status(200).json(body);
      };
      handler();
    }
  }, [res, rePath]);
};

export default handler;
