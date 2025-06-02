import MemecoinListRSC from "./MemecoinListRSC";


export const revalidate = 5;

const MemecoinsListISR = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Memecoins version isr</h1>
      <MemecoinListRSC />
    </div>
  );
};

export default MemecoinsListISR;
