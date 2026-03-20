function JsxRules() { 
  const name = "John"; 
  const age = 25; 
   
  return ( 
    <div> 
      {/* 1. Use {} for JavaScript expressions */} 
      <h1>Hello, {name}!</h1> 
      <p>You are {age} years old. Next year: {age + 1}</p> 
       
      {/* 2. className instead of class */} 
      <div className="container">Content</div> 
       
      {/* 3. Self-closing tags need / */} 
      <img src="pic.jpg" alt="Description" /> 
      <input type="text" /> 
       
      {/* 4. camelCase for attributes */} 
      <button onClick={() => alert('Clicked!')}>Click Me</button> 
       
      {/* 5. Comments in JSX */} 
      {/* This is a comment */} s
    </div> 
  ); 
} 

export default JsxRules; 