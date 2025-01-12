import { CloudArrowUpIcon, LockClosedIcon, ServerIcon } from '@heroicons/react/20/solid'

const features = [
    {
        name: 'Jamaah Mandiri',
        description:
            'Memberikan pelatihan sholat kepada warga yang belum bisa sholat, sehingga tidak malu lagi untuk pergi ke masjid untuk sholat berjamaah.',
        icon: CloudArrowUpIcon,
    },
    {
        name: 'Kampoeng Ramadhan',
        description: 'Semangat segera menyalurkan amanah infaq dari jamaah kembai ke jamaah lagi dalam bentuk pelayanan beribadah yang nyaman.',
        icon: LockClosedIcon,
    },
    {
        name: 'Mensholatkan.',
        description: 'Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis. sit morbi lobortis. sit morbi lobortis. sit morbi lobortis. sit morbi lobortis. sit morbi lobortis.',
        icon: ServerIcon,
    },
]

export default function About() {
    return (
        <div className="overflow-hidden bg-white py-24 sm:py-32" id="about">
            <div className="mx-auto max-w-7xl">
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                    <div className="lg:pr-8 lg:pt-4">
                        <div className="lg:max-w-lg text-center sm:text-left">
                            <h2 className="mt-2 text-pretty text-4xl font-semibold tracking-tight leading-tight text-gray-900 sm:text-5xl">
                                Profil Masjid Al-Amiin Ponorogo
                            </h2>
                            <p className="mt-6 text-lg/8 text-gray-600 leading-8">
                                Berawal dari sebuah langgar kecil di Kampung Pinggiran Selatan Yogyakarta, Masjid Ponorogo terus berusaha membangun Ummat dan Mensejahterakan Masyarakat. Logo Masjid Ponorogo terdiri dari tiga bahasa. Arab, Indonesia, dan Jawa. Ini adalah wujud dari semangat kami, untuk menjadi Muslim yang salih seutuhnya tanpa kehilangan akar budaya.
                            </p>
                            <dl className="mt-12 max-w-xl text-base/7 text-gray-600 lg:max-w-none flex gap-4 justify-between px-6 lg:px-8">
                                {features.map((feature) => (
                                    <div key={feature.name} className='text-center'>
                                        <div className=" bg-gray-100 rounded-full w-24 h-24 flex justify-center items-center overflow-hidden">
                                            <img src={'https://alif.id/wp-content/uploads/2019/12/1-habib-ali-1600x1140.jpg'} className='size-full object-cover' alt="pengurus" width={150} height={150} />
                                        </div>
                                        <h2 className='mt-3 font-semibold'>Ketua Takmir</h2>
                                    </div>
                                ))}
                            </dl>
                        </div>
                    </div>
                    <div className='flex justify-cente bg-yellow-600 rounded-tr-full rounded-bl-full'>
                        <div style={{ position: 'relative', width: '100%'}}>
                            <iframe
                                src="https://jadwalsholat.org/jadwal-sholat/monthly.php?id=265"
                                height={880}
                                width={380}
                                title="Jadwal Sholat"
                                className='w-full shadow-2xl rounded-tr-lg rounded-bl-[50px]'
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
