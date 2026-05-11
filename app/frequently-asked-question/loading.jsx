const Loading = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-8">

      {/* Animated bars */}
      <div className="flex items-end gap-1.5">
        {[0, 1, 2, 3, 4].map((i) => (
          <span
            key={i}
            className="w-1.5 bg-[#0d2b4e] rounded-full animate-pulse"
            style={{
              height: `${[20, 32, 44, 32, 20][i]}px`,
              animationDelay: `${i * 0.12}s`,
              animationDuration: '1s',
            }}
          />
        ))}
        {/* Gold accent bar in the middle */}
        <span
          className="w-1.5 bg-amber-500 rounded-full animate-pulse"
          style={{
            height: '44px',
            animationDelay: '0.24s',
            animationDuration: '1s',
            marginLeft: '4px',
          }}
        />
      </div>

      {/* Label */}
      <div className="flex flex-col items-center gap-1">
        <p className="font-sans text-[11px] font-bold tracking-[0.2em] uppercase text-slate-400">
          Loading
        </p>
        {/* Animated underline */}
        <span className="block h-px w-8 bg-amber-500 animate-pulse" />
      </div>

    </div>
  )
}

export default Loading