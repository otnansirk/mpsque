import { SwatchIcon,WrenchScrewdriverIcon, TrophyIcon } from '@heroicons/react/24/outline'

const data = [
    {
        icon: <SwatchIcon className='w-12 h-12'/>,
        title: "Tentang Kami",
        desc: `Berawal dari sebuah langgar
            kecil di Kampung Pinggiran Selatan Yogyakarta,
            Masjid Jogokariyan terus
            berusaha membangun Ummat dan
            Mensejahterakan Masyarakat.`
    },
    {
        icon: <WrenchScrewdriverIcon className='w-12 h-12'/>,
        title: "Management Masjid",
        desc: `Berawal dari sebuah langgar
            kecil di Kampung Pinggiran Selatan Yogyakarta,
            Masjid Jogokariyan terus
            berusaha membangun Ummat dan
            Mensejahterakan Masyarakat.`
    },
    {
        icon: <TrophyIcon className='w-12 h-12'/>,
        title: "Support",
        desc: `Berawal dari sebuah langgar
            kecil di Kampung Pinggiran Selatan Yogyakarta,
            Masjid Jogokariyan terus
            berusaha membangun Ummat dan
            Mensejahterakan Masyarakat.`
    },
]

export default function Features() {
    return (
        <div className="grid place-items-center w-full">
            <div className="bg-white bg-opacity-40 backdrop-blur rounded-xl flex sm:flex-row flex-col gap-12 sm:gap-0 justify-around p-4 sm:w-4/5 w-[360px] h-auto mt-[-80px] z-50 m-center">
            {
                data.map(item => (
                    <div key={item.title} className='text-center text-gray-500'>
                        <div className=" bg-gray-100 rounded-full w-28 h-28 flex justify-center justify-self-center items-center "> 
                            {item.icon}
                        </div>
                        <h2 className='text-xl font-semibold text-gray-800 my-3'>
                            {item.title}
                        </h2>
                        <p className='px-6'>
                            {item.desc}
                        </p>
                    </div>
                ))
            }
            </div>
        </div>
    )
}