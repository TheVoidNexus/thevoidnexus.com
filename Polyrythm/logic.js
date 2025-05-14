const paper = document.getElementById("paper"),
      pen = paper.getContext("2d");

const get = selector => document.querySelector(selector);

const toggles = {
  sound: get("#sound-toggle")
}

const colors = Array(21).fill("#A6C48A");

const settings = {
  startTime: new Date().getTime(),
  duration: 900, // Total time for all dots to realign at the starting point
  maxCycles: Math.max(colors.length, 100),
  soundEnabled: false, // User still must interact with screen first
  pulseEnabled: true, // Pulse will only show if sound is enabled as well
  instrument: "vibraphone" // "default" | "wave" | "vibraphone"
}

const handleSoundToggle = (enabled = !settings.soundEnabled) => {  
  settings.soundEnabled = enabled;
  toggles.sound.dataset.toggled = enabled;
}

document.onvisibilitychange = () => handleSoundToggle(false);

paper.onclick = () => handleSoundToggle();

const getFileName = index => {
  if(settings.instrument === "default") return `key-${index}`; 
  
  return `${settings.instrument}-key-${index}`;
}
 
const getUrl = index => `https://assets.codepen.io/1468070/${getFileName(index)}.wav`;

const keys = colors.map((color, index) => {
  const audio = new Audio(getUrl(index));
  
  audio.volume = 0.15;
  
  return audio;
});

let arcs = [];

const calculateVelocity = index => {  
    const numberOfCycles = settings.maxCycles - index,
          distancePerCycle = 2 * Math.PI;
  
  return (numberOfCycles * distancePerCycle) / settings.duration;
}

const calculateNextImpactTime = (currentImpactTime, velocity) => {
  return currentImpactTime + (Math.PI / velocity) * 1000;
}

const calculateDynamicOpacity = (currentTime, lastImpactTime, baseOpacity, maxOpacity, duration) => {
  const timeSinceImpact = currentTime - lastImpactTime,
        percentage = Math.min(timeSinceImpact / duration, 1),
        opacityDelta = maxOpacity - baseOpacity;
  
  return maxOpacity - (opacityDelta * percentage);
}

const determineOpacity = (currentTime, lastImpactTime, baseOpacity, maxOpacity, duration) => {
  if(!settings.pulseEnabled) return baseOpacity;
  
  return calculateDynamicOpacity(currentTime, lastImpactTime, baseOpacity, maxOpacity, duration);
}

const calculatePositionOnArc = (center, radius, angle) => ({
  x: center.x + radius * Math.cos(angle),
  y: center.y + radius * Math.sin(angle)
});

const playKey = index => keys[index].play();

const init = () => {
  pen.lineCap = "round";

  arcs = colors.map((color, index) => {
    const velocity = calculateVelocity(index),
          lastImpactTime = 0,
          nextImpactTime = calculateNextImpactTime(settings.startTime, velocity);

    return {
      color,
      velocity,
      lastImpactTime,
      nextImpactTime
    }
  });
}

const drawArc = (x, y, radius, start, end, action = "stroke") => {
  pen.beginPath();
  
  pen.arc(x, y, radius, start, end);
  
  if(action === "stroke") pen.stroke();    
  else pen.fill();
}

const drawPointOnArc = (center, arcRadius, pointRadius, angle) => {
  const position = calculatePositionOnArc(center, arcRadius, angle);

  drawArc(position.x, position.y, pointRadius, 0, 2 * Math.PI, "fill");    
}

const draw = () => {
  paper.width = paper.clientWidth;
  paper.height = paper.clientHeight;

  const currentTime = new Date().getTime(),
        elapsedTime = (currentTime - settings.startTime) / 1000;
  
  const length = Math.min(paper.width, paper.height) * 0.9,
        offset = (paper.width - length) / 2;
  
  const start = {
    x: offset,
    y: paper.height / 2
  }

  const end = {
    x: paper.width - offset,
    y: paper.height / 2
  }

  const center = {
    x: paper.width / 2,
    y: paper.height / 2
  }

  const base = {
    length: end.x - start.x,
    minAngle: 0,
    startAngle: 0,
    maxAngle: 2 * Math.PI
  }

  base.initialRadius = base.length * 0.05;
  base.circleRadius = base.length * 0.006;
  base.clearance = base.length * 0.03;
  base.spacing = (base.length - base.initialRadius - base.clearance) / 2 / colors.length;

  arcs.forEach((arc, index) => {
    const radius = base.initialRadius + (base.spacing * index);

    // Draw arcs
    pen.globalAlpha = determineOpacity(currentTime, arc.lastImpactTime, 0.15, 0.65, 1000);
    pen.lineWidth = base.length * 0.002;
    pen.strokeStyle = arc.color;
    
    const offset = base.circleRadius * (5 / 3) / radius;
    
    drawArc(center.x, center.y, radius, Math.PI + offset, (2 * Math.PI) - offset);
    
    drawArc(center.x, center.y, radius, offset, Math.PI - offset);
    
    // Draw impact points
    pen.globalAlpha = determineOpacity(currentTime, arc.lastImpactTime, 0.15, 0.85, 1000);
    pen.fillStyle = arc.color;
    
    drawPointOnArc(center, radius, base.circleRadius * 0.75, Math.PI);
    
    drawPointOnArc(center, radius, base.circleRadius * 0.75, 2 * Math.PI);
    
    // Draw moving circles
    pen.globalAlpha = 1;
    pen.fillStyle = arc.color;
    
    if(currentTime >= arc.nextImpactTime) {      
      if(settings.soundEnabled) {
        playKey(index);
        arc.lastImpactTime = arc.nextImpactTime;
      }
      
      arc.nextImpactTime = calculateNextImpactTime(arc.nextImpactTime, arc.velocity);      
    }
    
    const distance = elapsedTime >= 0 ? (elapsedTime * arc.velocity) : 0,
          angle = (Math.PI + distance) % base.maxAngle;
    
    drawPointOnArc(center, radius, base.circleRadius, angle);
  });
  
  requestAnimationFrame(draw);
}

init();

draw();