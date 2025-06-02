import LocalStorage from '@/components/LocaStorage';
import '@ant-design/v5-patch-for-react-19';


export default function Home() {
  return (
    <div className="flex justify-center mt-10">
      <div className="bg-gray-100 rounded-lg shadow-md p-6 flex flex-col gap-6 w-md">
        <span className="text-xl text-center">Super site de memecoins</span>
        <LocalStorage />
      </div>
    </div>
  );
}
