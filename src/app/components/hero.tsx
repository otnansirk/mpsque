'use client'

import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Dialog, DialogPanel } from '@headlessui/react'
import { useEffect, useState } from 'react'
// import useCookies from '@/hooks/useCookies'
import Image from 'next/image'
import Link from 'next/link'
import useCookies from 'hooks/useCookies'

const navigation = [
  { name: 'Home', href: '#home' },
  { name: 'Profile', href: '#about' },
  { name: 'Jadwal Sholat', href: '#about' },
  { name: 'Laporan Keuangan', href: '#report' },
]
export default function Hero() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isSignin, setIsSignin] = useState(false);
  const cook = useCookies("_Access_Token")
  useEffect(() => {
      setIsSignin(!!cook.cookies);
  }, [cook]);

  return (
    <div className="bg-gray-900 z-0" id="home">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-14">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="text-gray-700">{process.env.NEXT_PUBLIC_APP_NAME}</span>
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-900"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12 p-5 bg-white rounded-2xl bg-opacity-30">
            {navigation.map((item) => (
              <a key={item.name} href={item.href} className="text-sm/6 font-bold text-black hover:underline hover:text-gray-600">
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            {
              isSignin
                ? <Link href={'/dashboard'} className="text-sm/6 font-semibold text-white">
                  Dashboard<span aria-hidden="true">&rarr;</span>
                </Link>
                : <Link href={'/signin'} className="text-sm/6 font-semibold text-white">
                  Log in<span aria-hidden="true">&rarr;</span>
                </Link>
            }
          </div>
        </nav>
        <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-100 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-white/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="text-gray-700">{process.env.NEXT_PUBLIC_APP_NAME}</span>
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-400"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/25">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-black hover:bg-gray-300"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6">
                  {
                    isSignin
                      ? <Link href={'/dashboard'}
                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-black hover:bg-gray-300"
                      >
                        Dashboard
                      </Link>
                      : <Link href={'/signin'}
                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-black hover:bg-gray-300"
                      >
                        Log in
                      </Link>
                  }
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>

      <div className="relative isolate overflow-hidden pt-14">
        <Image
          width={1080}
          height={400}
          alt=""
          src="/images/hero.jpg"
          className="absolute inset-0 -z-10 size-full object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80 bg-gray-400 rounded-2xl p-8 bg-opacity-50"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
            <div className="text-center">
              <h1 className="text-balance text-5xl font-semibold tracking-tight text-white sm:text-7xl sm:leading-tight" style={{ textShadow: "6px 5px 4px rgba(0, 0, 0, 0.41)" }}>
                MASJID <br />
                AL-AMIIN PONOROGO
              </h1>
            </div>
          </div>
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          />
        </div>
      </div>
    </div>
  )
}
