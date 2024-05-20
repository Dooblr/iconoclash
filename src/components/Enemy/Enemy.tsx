import { useState, useEffect, useRef } from 'react'
import { IconType } from 'react-icons'
import { HiCubeTransparent } from 'react-icons/hi'
import './Enemy.scss'
import useStore from '../../store'

interface EnemyProps {
  maxHealth: number
  size: string
  Icon: IconType
  onDeath: () => void
  id: string
  position: any
}

const Enemy: React.FC<EnemyProps> = ({ maxHealth, size, Icon, onDeath, id }) => {
  const enemyRef = useRef<HTMLDivElement>(null)
  const [currentHealth, setCurrentHealth] = useState<number>(maxHealth)
  const [isHit, setIsHit] = useState<boolean>(false)
  const [isExploding, setIsExploding] = useState<boolean>(false)
  const { enemies, removeEnemy } = useStore()

  useEffect(() => {
    if (currentHealth === 0) {
      setIsExploding(true)
      setTimeout(() => {
        setIsExploding(false)
        onDeath()
        if (enemyRef.current) {
          removeEnemy(id)
        }
      }, 3000) // Explosion lasts 3 seconds
    }
  }, [currentHealth])

  const handleHit = () => {
    setIsHit(true)
    setCurrentHealth((health) => Math.max(health - 1, 0))
    setTimeout(() => setIsHit(false), 200) // Flash red for 200ms
  }

  useEffect(() => {
    const enemyElement = enemyRef.current
    if (enemyElement) {
      const handleEnemyHit = () => handleHit()
      enemyElement.addEventListener('enemyHit', handleEnemyHit)
      return () => {
        enemyElement.removeEventListener('enemyHit', handleEnemyHit)
      }
    }
  }, [])

  return (
    <div
      className={`enemy ${isExploding ? 'exploding' : ''}`}
      ref={enemyRef}
      style={{
        left: `${enemies[id]?.x}px`,
        top: `${enemies[id]?.y}px`,
      }}
    >
      {!isExploding && (
        <>
          <div className="enemy-health-bar">
            <div
              className="enemy-health-bar-inner"
              style={{ width: `${(currentHealth / maxHealth) * 100}%` }}
            />
          </div>
          <Icon
            className={`enemy-icon ${isHit ? 'hit' : ''}`}
            style={{ width: size, height: size }}
          />
        </>
      )}
      {isExploding && <HiCubeTransparent className="explosion-icon" />}
    </div>
  )
}

export default Enemy
