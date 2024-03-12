import React from 'react'

const Maintable = () => {
  return (
    <table className="table-auto w-[100%] text-left border-solid border-2 rounded-xl">
    <thead>
      <tr className='border-solid border-2 bg-[#EFF2F3]'>
        <th>Vehicle</th>
        <th>Rego</th>
        <th>upload date</th>
        <th>Uploaded doc.</th>
        <th>Status</th>
        <th>view doc.</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Placeholder</td>
        <td>Placeholder</td>
        <td>19/12/2023</td>
        <td>doc.pdf</td>
        <td>
          <span className='border-solid border-2 bg-[#58CB17] pt-[5px] pl-[16px] pr-[16px] pb-[8px] text-white rounded-3xl'>Approved</span>
        </td>
        <td>
          <a href="#" className='underline text-[#032272]'>
            view
          </a>
        </td>
      </tr>
      <tr>
      <td>Placeholder</td>
        <td>Placeholder</td>
        <td>18/12/2023</td>
        <td>doc.pdf</td>
        <td>
          <span className='border-solid border-2 bg-[#1EC9FF] pt-[5px] pl-[16px] pr-[16px] pb-[8px] text-white rounded-3xl'>Under review</span>
        </td>
        <td>
          <a href="#" className='underline text-[#032272]'>
            view
          </a>
        </td>
      </tr>
      <tr>
      <td>Placeholder</td>
        <td>Placeholder</td>
        <td>17/12/2023</td>
        <td>doc.pdf</td>
        <td>
          <span className='border-solid border-2 bg-[#FE3839] pt-[5px] pl-[16px] pr-[16px] pb-[8px] text-white rounded-3xl'>Rejected</span>
        </td>
        <td>
          <a href="#" className='underline text-[#032272]'>
            view
          </a>
        </td>
      </tr>
    </tbody>
  </table>
  )
}

export default Maintable