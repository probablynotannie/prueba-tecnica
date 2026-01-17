function Loading({ skeletons }) {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6 p-4">
      {skeletons.map((_, index) => (
        <div
          key={index}
          className="flex flex-col items-center bg-white rounded-xl p-4 shadow-md animate-pulse"
        >
          <div className="w-20 h-20 bg-gray-300 rounded-full mb-2" />
          <div className="w-16 h-4 bg-gray-300 rounded mb-2" />
          <div className="w-20 h-8 bg-gray-300 rounded" />
        </div>
      ))}
    </section>
  );
}

export default Loading;
