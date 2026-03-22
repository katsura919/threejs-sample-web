'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MODEL_PATH = '/assets/titan_murder_drone_head.glb';

export default function ThreeViewer() {
  const mountRef  = useRef<HTMLDivElement>(null);
  const modelRef  = useRef<THREE.Group | null>(null);
  const mixerRef  = useRef<THREE.AnimationMixer | null>(null);
  const timerRef  = useRef(new THREE.Timer());
  const frameRef    = useRef<number>(0);
  const controlsRef = useRef<OrbitControls | null>(null);
  const [loaded, setLoaded] = useState(false);

  // ── Init renderer / scene / camera ────────────────────────────
  useEffect(() => {
    const mount = mountRef.current!;
    const W = window.innerWidth;
    const H = window.innerHeight;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, W / H, 0.01, 100);
    camera.position.set(0, 0.1, 3.8);

    // Orbit controls — drag to rotate, scroll to zoom
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping  = true;
    controls.dampingFactor  = 0.06;
    controls.enablePan      = false;
    controls.minDistance    = 1.5;
    controls.maxDistance    = 9;
    controlsRef.current = controls;

    // Lighting
    scene.add(new THREE.AmbientLight(0xffffff, 0.35));

    const key = new THREE.DirectionalLight(0xffffff, 1.8);
    key.position.set(3, 4, 3);
    scene.add(key);

    // Red rim from behind-left — gives it menace
    const rim = new THREE.PointLight(0xc1121f, 6, 10);
    rim.position.set(-3, 1, -2);
    scene.add(rim);

    // Cool blue-ish fill from right — depth contrast
    const fill = new THREE.PointLight(0x4488ff, 1.5, 12);
    fill.position.set(4, -1, 2);
    scene.add(fill);

    // Load model
    new GLTFLoader().load(MODEL_PATH, (gltf) => {
      const model = gltf.scene;

      const box    = new THREE.Box3().setFromObject(model);
      const center = box.getCenter(new THREE.Vector3());
      const size   = box.getSize(new THREE.Vector3());
      const scale  = 2 / Math.max(size.x, size.y, size.z);

      model.scale.setScalar(scale);
      model.position.sub(center.multiplyScalar(scale));
      // Sit slightly right of center at rest
      model.position.x += 0.4;

      scene.add(model);
      modelRef.current = model as unknown as THREE.Group;

      if (gltf.animations.length) {
        const mixer = new THREE.AnimationMixer(model);
        gltf.animations.forEach(c => mixer.clipAction(c).play());
        mixerRef.current = mixer;
      }

      setLoaded(true);
    });

    // Render loop
    const timer = timerRef.current;
    const tick  = (ts: number) => {
      frameRef.current = requestAnimationFrame(tick);
      timer.update(ts);
      mixerRef.current?.update(timer.getDelta());
      controls.update();
      renderer.render(scene, camera);
    };
    frameRef.current = requestAnimationFrame(tick);

    const onResize = () => {
      const W = window.innerWidth, H = window.innerHeight;
      camera.aspect = W / H;
      camera.updateProjectionMatrix();
      renderer.setSize(W, H);
    };
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(frameRef.current);
      controls.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  // ── Scroll-driven animation ────────────────────────────────────
  useEffect(() => {
    if (!loaded || !modelRef.current) return;
    const model = modelRef.current;

    // Idle float — gentle Y bob
    const float = gsap.to(model.position, {
      y: '+=0.07',
      repeat: -1,
      yoyo: true,
      duration: 2.8,
      ease: 'sine.inOut',
    });

    // Full-page scrub: rotation + subtle X drift per section
    const st = ScrollTrigger.create({
      trigger: document.documentElement,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 2,
      onUpdate(self) {
        const p = self.progress;

        // Full 360° Y rotation across the whole page
        model.rotation.y = p * Math.PI * 2;

        // Slight X tilt — tips forward mid-scroll
        model.rotation.x = Math.sin(p * Math.PI) * 0.18;

        // Drift left as user reads designation section, drift back later
        model.position.x = 0.4 - Math.sin(p * Math.PI) * 0.6;
      },
    });

    return () => {
      float.kill();
      st.kill();
    };
  }, [loaded]);

  return (
    <div
      ref={mountRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'auto',
        cursor: 'grab',
      }}
    />
  );
}
