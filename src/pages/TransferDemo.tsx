import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Monitor, Smartphone } from 'lucide-react'
import Transfer from './Transfer'
import MobileTransfer from './mobile/Transfer'

export default function TransferDemo() {
  const [view, setView] = useState<'desktop' | 'mobile'>('desktop')

  return (
    <div className="min-h-screen bg-[#F6F6F8]">
      {/* View Toggle */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-center space-x-4">
          <Button
            variant={view === 'desktop' ? 'default' : 'outline'}
            onClick={() => setView('desktop')}
            className="bg-[#0B63BC] hover:bg-[#0B63BC]/90"
          >
            <Monitor className="w-4 h-4 mr-2" />
            Desktop View
          </Button>
          <Button
            variant={view === 'mobile' ? 'default' : 'outline'}
            onClick={() => setView('mobile')}
            className="bg-[#0B63BC] hover:bg-[#0B63BC]/90"
          >
            <Smartphone className="w-4 h-4 mr-2" />
            Mobile View
          </Button>
        </div>
      </div>

      {/* Transfer Interface */}
      <div className={view === 'mobile' ? 'max-w-sm mx-auto' : ''}>
        {view === 'desktop' ? <Transfer /> : <MobileTransfer />}
      </div>
    </div>
  )
} 