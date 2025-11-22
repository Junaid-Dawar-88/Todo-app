import Header from '@/component/Header'
import TodoTable from '@/component/TodoTable'
import Sidebar from '@/component/Sidebar'
import React from 'react'
import Card from '@/component/Card'


const Layout = () => {
  return (
    <div className='w-full bg-gray-100 flex '>
        <div className='w-[15%]'>
        <Sidebar />
        </div>
        <div className='w-full'>
        <div>
        <Header />
        </div>
        <div>
         <Card />
        </div>
        <div>
        <TodoTable />
        </div>
        </div>
    </div>
  )
}

export default Layout
