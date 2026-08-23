export function Eclipse({ size = 'default', withParticles = true }) {
  return (
    <div className={`eclipse-wrap eclipse-wrap--${size}`} role="img" aria-hidden="true">
      <div className="eclipse-orbit">
        {withParticles &&
          Array.from({ length: 8 }).map((_, i) => (
            <span
              key={i}
              className="eclipse-particle"
              style={{
                animationDelay: `${(i * -3.1).toFixed(1)}s`,
                animationDuration: `${14 + (i % 4) * 4}s`,
                top: '50%',
                left: '50%',
              }}
            />
          ))}
      </div>
      <div className="eclipse" />
    </div>
  );
}
