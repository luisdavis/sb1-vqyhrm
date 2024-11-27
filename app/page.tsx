import Image from 'next/image';
import Link from 'next/link';
import { LoginForm } from '@/components/auth/login-form';

export default function Home() {
  return (
    <main className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-[1200px] grid md:grid-cols-2 gap-6 bg-zinc-950 rounded-[32px] p-6 md:p-8">
        <div className="relative w-full aspect-square md:aspect-auto rounded-2xl overflow-hidden">
          <Image
            src="/images/wave-bg.webp"
            alt="Abstract wave pattern"
            fill
            className="object-cover"
            priority
          />
        </div>
        
        <div className="flex flex-col items-center justify-center p-4">
          <div className="w-full max-w-[400px] space-y-8">
            <div className="text-center space-y-2">
              <Image
                src="/images/logo.webp"
                alt="Sigma Algo"
                width={80}
                height={80}
                className="mx-auto"
              />
              <h1 className="text-2xl font-semibold text-white">Sigma Algo</h1>
              <p className="text-zinc-400">Welcome back!</p>
            </div>
            
            <LoginForm />
            
            <div className="space-y-4 text-center">
              <Link 
                href="/forgot-password"
                className="text-sm text-zinc-400 hover:text-white transition-colors"
              >
                Forgot Password?
              </Link>
              
              <div className="text-sm text-zinc-400">
                Don&apos;t have an account?{' '}
                <Link 
                  href="/register" 
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Register
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}