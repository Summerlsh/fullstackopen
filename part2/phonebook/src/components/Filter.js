const Filter = ({value, setValue}) => (
  <div>
    filter shown with <input value={value} onChange={e => setValue(e.target.value)}/>
  </div>
)

export default Filter
