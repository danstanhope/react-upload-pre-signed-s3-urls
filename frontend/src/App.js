import React from 'react';
import Upload from '../src/components/upload/Upload.js';

export default function App() {
  return (
    <main className="App mt-12">
      <section className="container mx-auto  max-w-screen-md px-6">
        <h1 className="text-left font-black	text-3xl pl-6">Pre-signed url upload to S3.</h1>
        <div className="bg-white rounded-xl shadow-md p-6 mt-6 pt-2">
          <Upload />
        </div>
      </section>
    </main>
  );
}
