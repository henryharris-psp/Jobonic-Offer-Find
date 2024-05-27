import Image from 'next/image'

interface Props {
  name: string
  className?: string
}
const Icon = ({ name, className = '' }: Props): React.ReactNode => {
  try {
    const iconImage = require(`@/../public/${name}.svg`)

    return (
      <Image src={iconImage} alt='icon' priority className={className} />
    )
  } catch (error) {
    return null;
  }
}

export default Icon
