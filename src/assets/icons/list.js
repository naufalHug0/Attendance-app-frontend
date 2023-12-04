import React from 'react'

const LIST_ICON = ({
    size,
    ...rest
}) => <div {...rest} className={`flex flex-col gap-3 ${size}`}>
    <span className="w-full h-1 bg-slate-400 rounded-md"></span>
    <span className="w-full h-1 bg-slate-400 rounded-md"></span>
    <span className="w-full h-1 bg-slate-400 rounded-md"></span>
</div>

export default LIST_ICON