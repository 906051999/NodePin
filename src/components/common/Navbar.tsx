'use client';

import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import UserAvatar from './UserAvatar';
import { Cog6ToothIcon } from '@heroicons/react/24/solid';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useStore } from '@/stores';
import SessionTimer from './SessionTimer';

export default function Navbar() {
  const { t } = useTranslation();
  const pathname = usePathname();
  const router = useRouter();
  const { checkAuth } = useStore();

  const isAdmin = pathname.startsWith('/admin');

  return (
    <nav className="sticky top-0 z-50 bg-[var(--card)] backdrop-blur-xl bg-opacity-80 border-b border-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* 左侧区域: Logo */}
          <div className="flex-shrink-0">
            <Link 
              href="/" 
              className="text-xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent"
            >
              NodePin
            </Link>
          </div>

          {/* 中间区域: 会话计时器 */}
          <SessionTimer />

          {/* 右侧区域: 管理面板按钮和头像 */}
          <div className="flex-shrink-0 flex items-center gap-4">
            {!isAdmin && (
              <Link
                href="/admin"
                className="px-4 py-2 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white rounded-lg transition-colors flex items-center gap-2"
                onClick={async (e) => {
                  e.preventDefault();
                  if (await checkAuth()) {
                    window.location.href = '/admin';
                  }
                }}
              >
                <Cog6ToothIcon className="w-5 h-5" />
                {t('common.adminPanel')}
              </Link>
            )}
            {isAdmin && (
              <button
                onClick={() => router.back()}
                className="group flex items-center gap-2 px-4 py-2 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white rounded-lg transition-colors"
                title={t('common.back')}
              >
                <ArrowLeftIcon className="w-5 h-5" />
                {t('common.back')}
              </button>
            )}
            <UserAvatar />
          </div>
        </div>
      </div>
    </nav>
  );
} 