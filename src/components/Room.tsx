import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Environment, Float, Sparkles, RoundedBox, Cylinder, useTexture, Text } from '@react-three/drei';
import { useState, Suspense, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Star, Camera, Heart, Sparkles as SparklesIcon, Volume2, VolumeX } from 'lucide-react';
import * as THREE from 'three';

const DOLL_MESSAGES: Record<string, string> = {
  '1': `رسالة داني : كل عام و انتي بخير ، افضل وحده عرفتها اربع سنوات وحنا معبعض ، ويارب نكمل مع بعض اكثر من الاربع هذول ، نتهاوش ايام و نفصل على بعض لكني احبك \nابي هالميلاد يكون افضل ميلاد لك و جعل كل ايامك سعيده\nممكن ما سويت اشياء كثيره لك لكن اتمنى تفرحين باللي سويته لك و ابيك تبقين سعيده ، انتي اكثر شخص ارتاح معه و كنتي افضل صديقه تعرفت عليها و بتبقين كذا للابد ، ندق و نسفل ببعض و نتهاوش ونسوي كل شيء بس مابي نترك بعض \nمن الشخص الغبي اللي بيترك شخص نادر زيك؟ لو الف العالم كله مافيه زيك ياوينتر\nلو قعدت رينا تقلد وتسوي كلشيء مستحيل تصير زيك لانك فعلًا نادرة ، وافضل دلوعة تعرفت عليها ، ماتدرين قد ايش ادعيلك و امدحك عند اللي اعرفهم  فعلًا انك مميزه وماحد بيلاقي مثلك ، احبككك 😭💙😭💙💙`,
  '2': `رسالة يون : وينتر يا عمري يا بعد جبدي اليوم يومج وانا مو مصدقة شكثر احبج وشكثر انتي غير عن كل الناس اللي مروا بحياتي انتي مو بس خويه انتي روحي الثانيه انتي الضحكة اللي تجي فجأة بدون سبب وانتي الحضن اللي لو الدنيا كلها ضاقت فيني القاه مفتوح لي دايم وينتر تدرين شكثر سوالفنا ما تخلص وشكثر نضحك لين بطوننا تعورنا وشكثر دموعنا نزلت واحنا نحچي لبعض عن كل شي بدون خوف ولا تردد احب فيج هالجنون اللي فيج احب فيج طيبتج احب فيج قلبج اللي وايد كبير ويشيل الكل بدون ما يتعب اليوم يوم ميلادج يعني يوم جا للدنيا احلى شي صار لي صدق والله ما ابالغ لو اقول حياتي قبلج غير عن بعدج انتي غيرتي فيني وايد اشياء خليتيني اضحك اكثر اخاف اقل احس ان عندي احد صدق يفهمني بدون ما اشرح وينتر يا حياتي اتمنى لج هالسنه كل شي حلو اتمنى تضحكين اكثر من قبل وتحققين كل شي تبينه حتى الاشياء اللي تحسينها بعيده ترى بتصير لانج تستاهلين كل خير وكل فرح وكل شي جميل بهالدنيا واذا في يوم حسيتج تعبانه ولا الدنيا واقفه ضدج تذكري اني انا موجوده وياج دايم حتى لو مو يمج جسديا انا معاج بقلبي وبسوالفي وبكل دعوة ادعيها لج من قلبي ياعمري انتي تتخيلين وكل سنه وانتي بخير يا اجمل وينتر بالدنيا كلها ويا رب تبقين لي طول العمر وما ينكسر هالربط اللي بينا لان صدق ما اقدر اتخيل حياتي بدونجج🎀🎀🍭 وينتر يا عمري اليوم يومج يوم ميلادج وانا والله مو مصدقة شكثر احبج وشكثر انتي صرتي جزء من حياتي ما يتعوض انتي مو بس خويه انتي روحي الثانيه وضحكتي اللي تجي فجأة بدون سبب وانتي الحضن اللي لو الدنيا كلها ضاقت فيني القاه مفتوح لي دايم تدرين شكثر سوالفنا ما تخلص وشكثر نضحك لين بطوننا تعورنا وشكثر نحچي عن كل شي بدون ما نخبي شي عن بعض احب فيج قلبج الطيب احب فيج جنانج وضحكتج اللي ترد الروح واحب فيج شلون دايم تحسين فيني حتى لو ما تكلمت اليوم مو يوم عادي لانه اليوم اليوم اللي جا فيه للدنيا احلى انسانه عرفتها بحياتي وانا صج احمد ربي اني عرفتك وصرتي بخاطري بهالشكل الكبير وينتر اتمنى لج بهالسنه كل الفرح وكل الاشياء الحلوه اللي قلبج يتمناها اتمنى تحققين كل احلامج وتضحكين اكثر واكثر واذا في يوم حسيتج تعبانه او الدنيا مضايقتج تذكري اني انا موجوده وياج دايم حتى لو مو يمج انا وياج بقلبي وبكل دعوه ادعيها لج احبج وايد اكثر مما تتوقعين وكل سنه وانتي بخير يا اجمل وينتر بالدنيا كلها ويا رب تبقين لي طول العمر وما ينكسر اللي بينا ابداااا💕💕💕🎀`,
  '3': `رسالة رنيم : Hii my love, my life, my everything beautiful 🪽\nHappy birthday to the prettiest, kindest, most amazing Bandari my eyes have ever seen 🥺\n\nI know I’m supposed to just say “happy birthday” and stop… but I have to add a little drama 🤍🤍\nYou know you’re my best friend, right? Ever since 6th grade, I’ve loved you more and more every day. You’re literally my role model and my diva 🥹✨\n\nMy life got so much better after you came into it. I laugh more, and I feel happier… you’re not just my friend, you’re my soulmate 🤍\n\nMaybe I’ve upset you before, but every time you’re sad, my heart hurts for you 😔\nI always want to be the reason behind your smile, not your tears 💕\n\nI wish I could be with you today and celebrate you, but even if I’m far, you’re always close to my heart 🤍\n\nAlso, everyone around me loves you because I talk about you all the time 😂🤍\n\nI love you so so much, and I hope you have the happiest year ever 🎉🎂💕`,
  '4': `رسالة هيام : For my love 𑣲\nكل عام وانتِ بخير بندورتي عمري ودنيتي انتِ احبك بالمره ومحظوظه ان عندي صديقه زيك وبالمره ماندمت اني عرفتك وانتِ انسانه لطيفه ومميزه عندي ومستحيل القى شخص زيك وكل يوم يزيد حبي لك عكس الناس الثانين الي ممكن كرهي لهم يتضاعف ، انتِ اختي الي ما جابتها امي وصديقتي المفضله وروح روحي  والانسانه الي احبها من اعماق قلبي ودايم معها وناشبه فحلقها ، دايم احب اتكلم معك ودايم تكونين الشخص الأول الي ابغى اتكلم معه ، ممكن نختلف بأشياء كثير حتى مو نفس الذوق لكن مستحيل ذا الشيء يغير حبي لك ودايم حبي لك ثابت ومستحيل اكرهك وبتذكر كل شيء حلو سويتيه لي 🪽 انتِ الشخص الوحيد الي ارتاح له والي احس معاه بالامان بالمره انبسط اذا تكلمت معك واذا قعدنا نسولف حتى بالمدرسه يوم اداوم وانا منفسه اشوفكم حتى لو خمس دقايق بس تخلوني اضحك تغيرون نفسيتي والله ، يعني النعمه الي انا فيها بالمره بالمره محظوظه غيري مو قادر يجيبها حتى ممكن غيري يغار مني لاني حظيت بذي النعمه ، حرفيا انتِ اجمل شيء صار بحياتي وانبسط كل ما اتذكر انك موجوده جنبي حرفيا تجيبين لي السعاده وتخليني ابتسم ، احبك واحب اليوم الي عرفتك فيه يا افضل انسانه بالدنيا شكرا لانك دايم معي ودايم تخليني مبسوطه وانك تتصرفين تصرفات الاخت مو الصديقه احبك حلوتتتتي وووو كرزتي🌚،🤍🤍🤍`,
  '5': `رسالة يينا : بندر كل عام وانت بخير وايامك بخير انت افضل من تعرفت عليه انتِ و احسن شخص تعرفت عليه  اربع سنين وانا معك ويارب نبقى طول العمر مع بعض والله محظوظه فيك احبك افضل من تعرفت عليه ان شاء الله جعل هالسنه تكون سنة سعادة و فرح لك و جعل ايامك كلها سعاده و ببقى معك باسوء ايامك وافضلها ان شاء الله والله احبك انتِ احسن بكميه تعرفت عليها بحياتي واحبك والله يديمك لنا ولا يحرمنا منك ويارب نتزوج مع بعض بعد مرا احبك ونا مرررااا محظوظه ماتتخيلين قد ايش احبك واحمد ربي عليك صح تعرفنا صدفه بس صدق احلى صدفه`,
  '6': `رسالة رين : كل عام يارب وانتِ بخير ويارب تكملين مليون سنه بعد ونبقا سوا معبعض دايما صح دايم نتهاوش ومستمرين باذن الله بس ترا جد احبك والله  وكثييييييير على انك حساس  وبكمي وجيزاني  برضوا بس جد تراك شخص لطيف واحببببك مره احب  لما نسولف واهاوش الي يتهاوش معاك على انك ترجعينه واحلف يمين ماعاد افزع لك  بس ترا علطول بكون معاك وحولك مادري شقول ماتعودت امدحك بس جد احبك واتمنى نبقى مع بعض باقي العمر كله وكبرتي بهالدنيا سنه بس بقلبي سنين احبك مره`
};

// --- UI Components ---

function Popup({ 
  activePopup, 
  onClose 
}: { 
  activePopup: { type: 'frame' | 'plushie' | 'poster' | 'doll', id: string, url?: string } | null, 
  onClose: () => void 
}) {
  return (
    <AnimatePresence>
      {activePopup && (
        <motion.div
          className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-pink-900/40 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative w-full max-w-lg bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-pink-100 overflow-hidden"
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-pink-100/50 hover:bg-pink-200 text-pink-500 rounded-full transition-colors z-10"
            >
              <X size={20} />
            </button>

            <div className="p-8 text-center">
              {activePopup.type === 'poster' && activePopup.url ? (
                <>
                  <div className="w-full bg-pink-50 rounded-2xl border-4 border-pink-400 overflow-hidden mb-6 cursor-pointer" onClick={onClose}>
                    <img src={activePopup.url} alt="Poster" className="w-full h-auto object-cover" />
                  </div>
                  <h2 className="text-2xl font-serif italic text-slate-700 mb-2">Beautiful Memory</h2>
                  <p className="text-slate-500">Click the image to close.</p>
                </>
              ) : activePopup.type === 'frame' ? (
                <>
                  <div className="w-full aspect-video bg-pink-50 rounded-2xl border-2 border-dashed border-pink-200 flex flex-col items-center justify-center text-pink-300 mb-6">
                    <Camera size={48} className="mb-2 opacity-50" />
                    <p className="font-medium">Cute Memory #{activePopup.id}</p>
                  </div>
                  <h2 className="text-2xl font-serif italic text-slate-700 mb-2">Aesthetic Poster</h2>
                  <p className="text-slate-500">So many cute details to look at!</p>
                </>
              ) : activePopup.type === 'plushie' ? (
                <>
                  <div className="w-32 h-32 mx-auto bg-gradient-to-br from-pink-200 to-purple-200 rounded-full flex items-center justify-center mb-6 shadow-inner">
                    <Heart size={48} className="text-white drop-shadow-md fill-current" />
                  </div>
                  <h2 className="text-2xl font-serif italic text-slate-700 mb-2">Magical Plushie #{activePopup.id}</h2>
                  <p className="text-slate-500">A soft, cuddly friend who watches over your dreams.</p>
                </>
              ) : activePopup.type === 'doll' ? (
                <>
                  <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4 text-pink-500">
                    <Heart size={32} />
                  </div>
                  <div className="max-h-[60vh] overflow-y-auto px-2 text-slate-700 text-lg leading-relaxed whitespace-pre-wrap text-right font-medium" dir="auto">
                    {DOLL_MESSAGES[activePopup.id]}
                  </div>
                </>
              ) : null}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// --- Decorative 3D Components ---

function FairyLights({ position, rotation, count = 15, curve = 1 }: { position: [number, number, number], rotation: [number, number, number], count?: number, curve?: number }) {
  const lights = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      const t = i / (count - 1);
      const x = (t - 0.5) * 8;
      const y = Math.sin(t * Math.PI) * -curve;
      return { x, y, color: ['#fde047', '#fbcfe8', '#a7f3d0', '#c084fc'][Math.floor(Math.random() * 4)] };
    });
  }, [count, curve]);

  return (
    <group position={position} rotation={rotation}>
      {/* Wire */}
      <mesh position={[0, -curve/2, 0]}>
        <tubeGeometry args={[new THREE.QuadraticBezierCurve3(new THREE.Vector3(-4, 0, 0), new THREE.Vector3(0, -curve*2, 0), new THREE.Vector3(4, 0, 0)), 20, 0.02, 8, false]} />
        <meshStandardMaterial color="#cbd5e1" />
      </mesh>
      {/* Lights */}
      {lights.map((l, i) => (
        <mesh key={i} position={[l.x, l.y, 0.1]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color={l.color} emissive={l.color} emissiveIntensity={2} toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
}

function Books({ position, count = 10, width = 2 }: { position: [number, number, number], count?: number, width?: number }) {
  const books = useMemo(() => {
    return Array.from({ length: count }).map(() => ({
      color: `hsl(${Math.random() * 60 + 280}, 70%, 80%)`, // Pinks, purples, blues
      h: 0.4 + Math.random() * 0.3,
      w: 0.08 + Math.random() * 0.05,
      d: 0.3 + Math.random() * 0.1,
      rotZ: (Math.random() > 0.8 ? Math.random() * 0.4 - 0.2 : 0),
    }));
  }, [count]);

  let currentX = -width / 2;
  return (
    <group position={position}>
      {books.map((b, i) => {
        const x = currentX + b.w / 2;
        currentX += b.w + 0.02;
        return (
          <mesh key={i} position={[x, b.h / 2, 0]} rotation={[0, 0, b.rotZ]}>
            <boxGeometry args={[b.w, b.h, b.d]} />
            <meshStandardMaterial color={b.color} />
          </mesh>
        );
      })}
    </group>
  );
}

function Posters({ position, rotation, count = 6, seed = "poster", onInteract }: { position: [number, number, number], rotation: [number, number, number], count?: number, seed?: string, onInteract?: (type: 'poster', id: string, url: string) => void }) {
  const posters = useMemo(() => {
    // Use the uploaded image files
    const imageUrls = [
      '/poster1.jpeg',
      '/poster2.jpeg',
      '/poster3.jpeg',
      '/poster4.jpeg',
      '/poster5.jpeg',
      '/poster6.jpeg'
    ];
    
    return Array.from({ length: count }).map((_, i) => {
      const isLandscape = Math.random() > 0.7;
      const w = isLandscape ? 1.2 + Math.random() * 0.5 : 0.6 + Math.random() * 0.4;
      const h = isLandscape ? 0.8 + Math.random() * 0.4 : 0.8 + Math.random() * 0.6;
      
      // Arrange in a 3-column grid
      const cols = 3;
      const col = i % cols;
      const row = Math.floor(i / cols);
      
      const spacingX = 2.5;
      const spacingY = 2.0;
      
      // Add a tiny bit of random offset and rotation for a natural "taped to wall" look
      const x = (col - (cols - 1) / 2) * spacingX + (Math.random() - 0.5) * 0.3;
      const y = (row - 0.5) * spacingY + (Math.random() - 0.5) * 0.3;
      const rotZ = (Math.random() - 0.5) * 0.1;

      return {
        x,
        y,
        w,
        h,
        rotZ,
        url: imageUrls[i % imageUrls.length]
      };
    });
  }, [count]);

  const textures = useTexture(posters.map(p => p.url));

  return (
    <group position={position} rotation={rotation}>
      {posters.map((p, i) => (
        <group key={i} position={[p.x, p.y, 0.01]} rotation={[0, 0, p.rotZ]}>
          {/* Prominent Pink Frame */}
          <mesh 
            position={[0, 0, 0]} 
            castShadow
            onClick={(e) => { e.stopPropagation(); onInteract?.('poster', i.toString(), p.url); }}
            onPointerOver={() => document.body.style.cursor = 'pointer'}
            onPointerOut={() => document.body.style.cursor = 'auto'}
          >
            <boxGeometry args={[p.w + 0.15, p.h + 0.15, 0.04]} />
            <meshStandardMaterial color="#f472b6" roughness={0.4} metalness={0.1} />
          </mesh>
          {/* Poster Image */}
          <mesh position={[0, 0, 0.021]}>
            <planeGeometry args={[p.w, p.h]} />
            <meshStandardMaterial map={textures[i]} roughness={0.9} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function Cloud({ position, scale = 1 }: { position: [number, number, number], scale?: number }) {
  return (
    <Float speed={2} floatIntensity={0.5} rotationIntensity={0.1}>
      <group position={position} scale={scale}>
        <mesh position={[0, 0, 0]} castShadow><sphereGeometry args={[0.6, 32, 32]} /><meshStandardMaterial color="#ffffff" roughness={1} /></mesh>
        <mesh position={[0.5, -0.1, 0.2]} castShadow><sphereGeometry args={[0.4, 32, 32]} /><meshStandardMaterial color="#ffffff" roughness={1} /></mesh>
        <mesh position={[-0.5, -0.2, -0.1]} castShadow><sphereGeometry args={[0.45, 32, 32]} /><meshStandardMaterial color="#ffffff" roughness={1} /></mesh>
        <mesh position={[0.2, 0.3, -0.2]} castShadow><sphereGeometry args={[0.5, 32, 32]} /><meshStandardMaterial color="#ffffff" roughness={1} /></mesh>
      </group>
    </Float>
  );
}

function PottedPlant({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Pot */}
      <mesh position={[0, 0.2, 0]} castShadow>
        <cylinderGeometry args={[0.2, 0.15, 0.4]} />
        <meshStandardMaterial color="#fecdd3" />
      </mesh>
      {/* Leaves */}
      {Array.from({ length: 5 }).map((_, i) => (
        <mesh key={i} position={[0, 0.5, 0]} rotation={[Math.random() * 0.5, (i * Math.PI * 2) / 5, Math.random() * 0.5]} castShadow>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial color="#86efac" />
        </mesh>
      ))}
    </group>
  );
}

function Dreamcatcher({ position, rotation, scale = 1 }: { position: [number, number, number], rotation?: [number, number, number], scale?: number }) {
  return (
    <group position={position} rotation={rotation || [0, 0, 0]} scale={scale}>
      {/* String hanging from ceiling */}
      <mesh position={[0, 1, 0]}>
        <cylinderGeometry args={[0.01, 0.01, 2]} />
        <meshStandardMaterial color="#cbd5e1" />
      </mesh>
      {/* Main Hoop */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.4, 0.02, 16, 64]} />
        <meshStandardMaterial color="#fef08a" />
      </mesh>
      {/* Web (simplified as a star-like pattern) */}
      {Array.from({ length: 6 }).map((_, i) => (
        <mesh key={i} rotation={[0, 0, (i * Math.PI) / 6]}>
          <cylinderGeometry args={[0.005, 0.005, 0.8]} />
          <meshStandardMaterial color="#ffffff" opacity={0.5} transparent />
        </mesh>
      ))}
      {/* Hanging Feathers */}
      {[-0.25, 0, 0.25].map((x, i) => (
        <group key={i} position={[x, -0.4, 0]}>
          <mesh position={[0, -0.2, 0]}>
            <cylinderGeometry args={[0.005, 0.005, 0.4]} />
            <meshStandardMaterial color="#cbd5e1" />
          </mesh>
          <mesh position={[0, -0.5, 0]}>
            <coneGeometry args={[0.05, 0.2, 16]} />
            <meshStandardMaterial color={['#fbcfe8', '#a7f3d0', '#c084fc'][i]} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function FairyFigurine({ position, rotation }: { position: [number, number, number], rotation?: [number, number, number] }) {
  return (
    <group position={position} rotation={rotation || [0, 0, 0]}>
      {/* Base */}
      <mesh position={[0, 0.05, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.2, 0.1]} />
        <meshStandardMaterial color="#f1f5f9" />
      </mesh>
      {/* Body */}
      <mesh position={[0, 0.3, 0]} castShadow>
        <coneGeometry args={[0.1, 0.4, 16]} />
        <meshStandardMaterial color="#c084fc" emissive="#c084fc" emissiveIntensity={0.2} />
      </mesh>
      {/* Head */}
      <mesh position={[0, 0.55, 0]} castShadow>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#fde047" />
      </mesh>
      {/* Wings */}
      <mesh position={[-0.1, 0.35, -0.05]} rotation={[0, 0.5, 0.5]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#e0e7ff" opacity={0.6} transparent emissive="#e0e7ff" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[0.1, 0.35, -0.05]} rotation={[0, -0.5, -0.5]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#e0e7ff" opacity={0.6} transparent emissive="#e0e7ff" emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
}

function Trinket({ position, type, color }: { position: [number, number, number], type: 'star' | 'diamond' | 'heart', color: string }) {
  return (
    <Float speed={2} floatIntensity={0.2} rotationIntensity={0.5}>
      <group position={position}>
        {type === 'star' && (
          <mesh castShadow>
            <octahedronGeometry args={[0.08, 0]} />
            <meshStandardMaterial color={color} metalness={0.8} roughness={0.1} emissive={color} emissiveIntensity={0.4} />
          </mesh>
        )}
        {type === 'diamond' && (
          <mesh castShadow>
            <coneGeometry args={[0.06, 0.15, 4]} />
            <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} emissive={color} emissiveIntensity={0.2} />
          </mesh>
        )}
        {type === 'heart' && (
          <mesh castShadow>
            <sphereGeometry args={[0.06, 16, 16]} />
            <meshStandardMaterial color={color} metalness={0.5} roughness={0.2} emissive={color} emissiveIntensity={0.3} />
          </mesh>
        )}
        <Sparkles count={5} scale={0.2} size={2} speed={0.4} opacity={0.8} color={color} />
      </group>
    </Float>
  );
}

function Doll({ position, rotation = [0, 0, 0], scale = 1, type, onInteract }: { position: [number, number, number], rotation?: [number, number, number], scale?: number, type: 1 | 2 | 3 | 4 | 5 | 6, onInteract?: (type: 'doll', id: string) => void }) {
  const handleClick = (e: any) => {
    e.stopPropagation();
    onInteract?.('doll', type.toString());
  };
  const handlePointerOver = () => document.body.style.cursor = 'pointer';
  const handlePointerOut = () => document.body.style.cursor = 'auto';

  return (
    <group position={position} rotation={rotation} scale={scale} onClick={handleClick} onPointerOver={handlePointerOver} onPointerOut={handlePointerOut}>
      {type === 1 && (
        <group>
          {/* Bunny */}
          <mesh position={[0, 0.2, 0]} castShadow><cylinderGeometry args={[0.15, 0.2, 0.4]} /><meshStandardMaterial color="#fbcfe8" /></mesh>
          <mesh position={[0, 0.55, 0]} castShadow><sphereGeometry args={[0.25, 32, 32]} /><meshStandardMaterial color="#ffffff" /></mesh>
          <mesh position={[-0.1, 0.85, 0]} rotation={[0, 0, 0.2]} castShadow><cylinderGeometry args={[0.05, 0.05, 0.4]} /><meshStandardMaterial color="#fbcfe8" /></mesh>
          <mesh position={[0.1, 0.85, 0]} rotation={[0, 0, -0.2]} castShadow><cylinderGeometry args={[0.05, 0.05, 0.4]} /><meshStandardMaterial color="#fbcfe8" /></mesh>
          <mesh position={[-0.08, 0.6, 0.22]}><sphereGeometry args={[0.03]} /><meshStandardMaterial color="#1e293b" /></mesh>
          <mesh position={[0.08, 0.6, 0.22]}><sphereGeometry args={[0.03]} /><meshStandardMaterial color="#1e293b" /></mesh>
          <mesh position={[0, 0.15, -0.2]} castShadow><sphereGeometry args={[0.08]} /><meshStandardMaterial color="#ffffff" /></mesh>
        </group>
      )}
      {type === 2 && (
        <group>
          {/* Bear */}
          <mesh position={[0, 0.25, 0]} castShadow><sphereGeometry args={[0.25]} /><meshStandardMaterial color="#d97706" /></mesh>
          <mesh position={[0, 0.6, 0]} castShadow><sphereGeometry args={[0.22]} /><meshStandardMaterial color="#f59e0b" /></mesh>
          <mesh position={[-0.15, 0.75, 0]} castShadow><sphereGeometry args={[0.08]} /><meshStandardMaterial color="#d97706" /></mesh>
          <mesh position={[0.15, 0.75, 0]} castShadow><sphereGeometry args={[0.08]} /><meshStandardMaterial color="#d97706" /></mesh>
          <mesh position={[0, 0.55, 0.2]} castShadow><sphereGeometry args={[0.08]} /><meshStandardMaterial color="#fef3c7" /></mesh>
          <mesh position={[0, 0.58, 0.27]}><sphereGeometry args={[0.02]} /><meshStandardMaterial color="#1e293b" /></mesh>
          <mesh position={[-0.08, 0.65, 0.18]}><sphereGeometry args={[0.025]} /><meshStandardMaterial color="#1e293b" /></mesh>
          <mesh position={[0.08, 0.65, 0.18]}><sphereGeometry args={[0.025]} /><meshStandardMaterial color="#1e293b" /></mesh>
        </group>
      )}
      {type === 3 && (
        <group>
          {/* Robot */}
          <mesh position={[0, 0.25, 0]} castShadow><boxGeometry args={[0.3, 0.3, 0.2]} /><meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.2} /></mesh>
          <mesh position={[0, 0.55, 0]} castShadow><boxGeometry args={[0.25, 0.2, 0.2]} /><meshStandardMaterial color="#38bdf8" metalness={0.6} roughness={0.3} /></mesh>
          <mesh position={[0, 0.7, 0]} castShadow><cylinderGeometry args={[0.02, 0.02, 0.1]} /><meshStandardMaterial color="#94a3b8" /></mesh>
          <mesh position={[0, 0.75, 0]} castShadow><sphereGeometry args={[0.05]} /><meshStandardMaterial color="#fde047" emissive="#fde047" emissiveIntensity={0.8} /></mesh>
          <mesh position={[-0.06, 0.55, 0.11]}><planeGeometry args={[0.06, 0.04]} /><meshStandardMaterial color="#fde047" emissive="#fde047" emissiveIntensity={1} /></mesh>
          <mesh position={[0.06, 0.55, 0.11]}><planeGeometry args={[0.06, 0.04]} /><meshStandardMaterial color="#fde047" emissive="#fde047" emissiveIntensity={1} /></mesh>
          <mesh position={[-0.2, 0.25, 0]} rotation={[0, 0, 0.5]} castShadow><cylinderGeometry args={[0.04, 0.04, 0.2]} /><meshStandardMaterial color="#94a3b8" metalness={0.8} /></mesh>
          <mesh position={[0.2, 0.25, 0]} rotation={[0, 0, -0.5]} castShadow><cylinderGeometry args={[0.04, 0.04, 0.2]} /><meshStandardMaterial color="#94a3b8" metalness={0.8} /></mesh>
        </group>
      )}
      {type === 4 && (
        <group>
          {/* Mushroom */}
          <mesh position={[0, 0.2, 0]} castShadow><cylinderGeometry args={[0.1, 0.15, 0.4]} /><meshStandardMaterial color="#fef08a" /></mesh>
          <mesh position={[0, 0.4, 0]} castShadow><sphereGeometry args={[0.3, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} /><meshStandardMaterial color="#ef4444" /></mesh>
          <mesh position={[0, 0.65, 0.1]} rotation={[0.5, 0, 0]}><circleGeometry args={[0.06]} /><meshStandardMaterial color="#ffffff" /></mesh>
          <mesh position={[-0.15, 0.55, -0.1]} rotation={[0.5, -0.5, 0]}><circleGeometry args={[0.05]} /><meshStandardMaterial color="#ffffff" /></mesh>
          <mesh position={[0.15, 0.5, 0.15]} rotation={[0.5, 0.5, 0]}><circleGeometry args={[0.07]} /><meshStandardMaterial color="#ffffff" /></mesh>
          <mesh position={[-0.05, 0.25, 0.12]}><sphereGeometry args={[0.025]} /><meshStandardMaterial color="#1e293b" /></mesh>
          <mesh position={[0.05, 0.25, 0.12]}><sphereGeometry args={[0.025]} /><meshStandardMaterial color="#1e293b" /></mesh>
          <mesh position={[-0.1, 0.22, 0.11]}><sphereGeometry args={[0.02]} /><meshStandardMaterial color="#fca5a5" /></mesh>
          <mesh position={[0.1, 0.22, 0.11]}><sphereGeometry args={[0.02]} /><meshStandardMaterial color="#fca5a5" /></mesh>
        </group>
      )}
      {type === 5 && (
        <group>
          {/* Wizard */}
          <mesh position={[0, 0.25, 0]} castShadow><coneGeometry args={[0.25, 0.5, 32]} /><meshStandardMaterial color="#8b5cf6" /></mesh>
          <mesh position={[0, 0.6, 0]} castShadow><sphereGeometry args={[0.18]} /><meshStandardMaterial color="#ffedd5" /></mesh>
          <mesh position={[0, 0.85, 0]} castShadow><coneGeometry args={[0.2, 0.4, 32]} /><meshStandardMaterial color="#4c1d95" /></mesh>
          <mesh position={[0, 0.65, 0]} castShadow><cylinderGeometry args={[0.25, 0.25, 0.05, 32]} /><meshStandardMaterial color="#4c1d95" /></mesh>
          <mesh position={[0, 0.5, 0.15]} castShadow><coneGeometry args={[0.15, 0.2, 32]} /><meshStandardMaterial color="#f8fafc" /></mesh>
          <mesh position={[-0.06, 0.62, 0.16]}><sphereGeometry args={[0.02]} /><meshStandardMaterial color="#1e293b" /></mesh>
          <mesh position={[0.06, 0.62, 0.16]}><sphereGeometry args={[0.02]} /><meshStandardMaterial color="#1e293b" /></mesh>
          <mesh position={[0.2, 0.3, 0.1]} rotation={[0, 0, -0.5]} castShadow><cylinderGeometry args={[0.01, 0.01, 0.3]} /><meshStandardMaterial color="#78350f" /></mesh>
          <mesh position={[0.27, 0.45, 0.1]}><sphereGeometry args={[0.04]} /><meshStandardMaterial color="#fde047" emissive="#fde047" emissiveIntensity={0.8} /></mesh>
        </group>
      )}
      {type === 6 && (
        <group>
          {/* Star Child */}
          <mesh position={[0, 0.2, 0]} castShadow><sphereGeometry args={[0.2]} /><meshStandardMaterial color="#f97316" /></mesh>
          <mesh position={[0, 0.55, 0]} castShadow><octahedronGeometry args={[0.25, 1]} /><meshStandardMaterial color="#fde047" emissive="#fde047" emissiveIntensity={0.2} /></mesh>
          <mesh position={[-0.08, 0.55, 0.22]}><sphereGeometry args={[0.025]} /><meshStandardMaterial color="#1e293b" /></mesh>
          <mesh position={[0.08, 0.55, 0.22]}><sphereGeometry args={[0.025]} /><meshStandardMaterial color="#1e293b" /></mesh>
          <mesh position={[0, 0.9, 0]} rotation={[1.5, 0, 0]} castShadow><torusGeometry args={[0.15, 0.02, 16, 32]} /><meshStandardMaterial color="#fef08a" emissive="#fef08a" emissiveIntensity={0.5} /></mesh>
        </group>
      )}
    </group>
  );
}

function ComputerScreen({ url }: { url: string }) {
  const texture = useTexture(url);
  return (
    <mesh position={[0, 0.6, 0.06]}>
      <planeGeometry args={[1.7, 1.1]} />
      <meshStandardMaterial map={texture} emissiveMap={texture} emissive="white" emissiveIntensity={0.5} />
    </mesh>
  );
}

function MagicalAtmosphere() {
  const orb1 = useRef<THREE.Mesh>(null);
  const orb2 = useRef<THREE.Mesh>(null);
  const orb3 = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (orb1.current) {
      orb1.current.position.y = Math.sin(t * 0.5) * 1.5 + 2;
      orb1.current.position.x = Math.cos(t * 0.3) * 3;
    }
    if (orb2.current) {
      orb2.current.position.y = Math.cos(t * 0.4) * 2 + 3;
      orb2.current.position.z = Math.sin(t * 0.6) * 3 - 1;
    }
    if (orb3.current) {
      orb3.current.position.x = Math.sin(t * 0.7) * 2 - 2;
      orb3.current.position.z = Math.cos(t * 0.5) * 2 - 2;
    }
  });

  return (
    <group>
      {/* Ambient magical dust */}
      <Sparkles count={300} scale={[12, 8, 12]} size={3} speed={0.2} opacity={0.4} color="#fbcfe8" position={[0, 4, 0]} />
      <Sparkles count={150} scale={[10, 6, 10]} size={4} speed={0.3} opacity={0.6} color="#c084fc" position={[0, 3, 0]} />
      <Sparkles count={100} scale={[14, 10, 14]} size={2} speed={0.1} opacity={0.3} color="#fde047" position={[0, 5, 0]} />
      
      {/* Floating magical orbs */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh ref={orb1} position={[3, 2, -2]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshBasicMaterial color="#f472b6" />
          <pointLight color="#f472b6" intensity={1.5} distance={6} />
        </mesh>
      </Float>

      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1.5}>
        <mesh ref={orb2} position={[-3, 3, 1]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshBasicMaterial color="#a855f7" />
          <pointLight color="#a855f7" intensity={1.2} distance={5} />
        </mesh>
      </Float>

      <Float speed={2.5} rotationIntensity={0.8} floatIntensity={1.2}>
        <mesh ref={orb3} position={[-1, 1.5, -3]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshBasicMaterial color="#38bdf8" />
          <pointLight color="#38bdf8" intensity={1.4} distance={7} />
        </mesh>
      </Float>
    </group>
  );
}

// --- Main Room Model ---

function RoomModel({ onInteract }: { onInteract: (type: 'frame' | 'plushie' | 'poster' | 'doll', id: string, url?: string) => void }) {
  return (
    <group position={[0, -1, 0]}>
      {/* Floor */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[15, 15]} />
        <meshPhysicalMaterial color="#f472b6" transparent opacity={0.6} roughness={0.1} metalness={0.1} clearcoat={1} clearcoatRoughness={0.1} />
      </mesh>
      
      {/* Walls */}
      <mesh receiveShadow position={[0, 4, -5]} castShadow>
        <boxGeometry args={[10, 8, 0.2]} />
        <meshStandardMaterial color="#d8b4fe" />
      </mesh>
      <mesh receiveShadow position={[-5, 4, 0]} rotation={[0, Math.PI / 2, 0]} castShadow>
        <boxGeometry args={[10, 8, 0.2]} />
        <meshStandardMaterial color="#d8b4fe" />
      </mesh>

      {/* --- DECORATIONS --- */}
      <MagicalAtmosphere />
      
      {/* Fairy Lights */}
      <FairyLights position={[0, 6.5, -4.8]} rotation={[0, 0, 0]} count={25} curve={1.5} />
      <FairyLights position={[-4.8, 6.5, 0]} rotation={[0, Math.PI / 2, 0]} count={25} curve={1.5} />

      {/* Hanging Dreamcatchers */}
      <Dreamcatcher position={[-2, 5, -4.5]} scale={0.8} />
      <Dreamcatcher position={[3, 5.5, 2]} rotation={[0, Math.PI / 4, 0]} scale={0.6} />

      {/* Posters */}
      <Posters position={[0, 4, -4.8]} rotation={[0, 0, 0]} count={6} onInteract={onInteract} />
      <Posters position={[-4.8, 4, 0]} rotation={[0, Math.PI / 2, 0]} count={6} onInteract={onInteract} />

      {/* Hanging Clouds */}
      <Cloud position={[2, 6, -2]} scale={0.8} />
      <Cloud position={[-2, 5.5, -1]} scale={0.6} />
      <Cloud position={[0, 6.5, 2]} scale={1} />

      {/* Rugs (Layered) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[1.5, 0.01, 1.5]} receiveShadow>
        <circleGeometry args={[3.5, 64]} />
        <meshStandardMaterial color="#e9d5ff" />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0.5, 0.02, 2.5]} receiveShadow>
        <circleGeometry args={[2, 64]} />
        <meshStandardMaterial color="#c7d2fe" />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[2.5, 0.02, 0.5]} receiveShadow>
        <circleGeometry args={[1.5, 64]} />
        <meshStandardMaterial color="#fbcfe8" />
      </mesh>

      {/* --- FURNITURE --- */}

      {/* Bed */}
      <group position={[-2, 0.5, -2]}>
        {/* Bed Frame / Headboard */}
        <RoundedBox position={[0, 1.5, -2.4]} args={[4.2, 3, 0.2]} radius={0.1} castShadow receiveShadow>
          <meshStandardMaterial color="#ffffff" />
        </RoundedBox>
        {/* Mattress */}
        <RoundedBox args={[4, 1, 5]} radius={0.1} castShadow receiveShadow>
          <meshStandardMaterial color="#ffffff" />
        </RoundedBox>
        {/* Blanket */}
        <RoundedBox position={[0, 0.55, 0.5]} args={[4.2, 0.2, 4]} radius={0.1} castShadow receiveShadow>
          <meshStandardMaterial color="#ec4899" />
        </RoundedBox>
        {/* Extra Blanket Layer */}
        <RoundedBox position={[0, 0.6, 1.5]} args={[4.3, 0.1, 2]} radius={0.05} castShadow receiveShadow>
          <meshStandardMaterial color="#a855f7" />
        </RoundedBox>
        
        {/* Lots of Pillows */}
        <RoundedBox position={[-1.2, 0.6, -1.8]} args={[1.2, 0.3, 0.8]} radius={0.1} castShadow rotation={[0.2, 0.1, 0]}>
          <meshStandardMaterial color="#e0e7ff" />
        </RoundedBox>
        <RoundedBox position={[0, 0.6, -1.9]} args={[1.2, 0.3, 0.8]} radius={0.1} castShadow rotation={[0.3, -0.1, 0]}>
          <meshStandardMaterial color="#fbcfe8" />
        </RoundedBox>
        <RoundedBox position={[1.2, 0.6, -1.8]} args={[1.2, 0.3, 0.8]} radius={0.1} castShadow rotation={[0.2, -0.2, 0]}>
          <meshStandardMaterial color="#e0e7ff" />
        </RoundedBox>
        {/* Cute round pillows */}
        <mesh position={[-0.5, 0.8, -1.4]} castShadow rotation={[0.5, 0, 0]}>
          <cylinderGeometry args={[0.3, 0.3, 0.2, 32]} />
          <meshStandardMaterial color="#fde047" />
        </mesh>
        <mesh position={[0.6, 0.8, -1.3]} castShadow rotation={[0.4, 0.2, 0]}>
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshStandardMaterial color="#a7f3d0" />
        </mesh>
      </group>

      {/* Desk Area */}
      <group position={[3, 0, -3.5]}>
        {/* Table Top */}
        <RoundedBox position={[0, 2, 0]} args={[3.5, 0.2, 2]} radius={0.05} castShadow receiveShadow>
          <meshStandardMaterial color="#ffffff" />
        </RoundedBox>
        {/* Legs */}
        {[-1.6, 1.6].map((x) => 
          [-0.8, 0.8].map((z) => (
            <mesh key={`${x}-${z}`} position={[x, 1, z]} castShadow receiveShadow>
              <cylinderGeometry args={[0.05, 0.05, 2]} />
              <meshStandardMaterial color="#cbd5e1" />
            </mesh>
          ))
        )}
        
        {/* Computer Monitor */}
        <group position={[0, 2.1, -0.5]}>
          <RoundedBox position={[0, 0.6, 0]} args={[1.8, 1.2, 0.1]} radius={0.05} castShadow>
            <meshStandardMaterial color="#f8fafc" />
          </RoundedBox>
          {/* Screen glow */}
          <ComputerScreen url="/winter.jpeg" />
          {/* Stand */}
          <mesh position={[0, 0.2, -0.05]} castShadow>
            <cylinderGeometry args={[0.05, 0.1, 0.4]} />
            <meshStandardMaterial color="#cbd5e1" />
          </mesh>
          <mesh position={[0, 0.05, -0.05]} castShadow>
            <boxGeometry args={[0.6, 0.05, 0.4]} />
            <meshStandardMaterial color="#cbd5e1" />
          </mesh>
        </group>

        {/* Keyboard & Mouse */}
        <mesh position={[0, 2.15, 0.4]} castShadow rotation={[0.05, 0, 0]}>
          <boxGeometry args={[1.2, 0.05, 0.4]} />
          <meshStandardMaterial color="#f1f5f9" />
        </mesh>
        <mesh position={[0.9, 2.15, 0.4]} castShadow>
          <boxGeometry args={[0.15, 0.05, 0.25]} />
          <meshStandardMaterial color="#f1f5f9" />
        </mesh>

        {/* Desk Clutter */}
        <PottedPlant position={[-1.2, 2.1, -0.5]} />
        <FairyFigurine position={[-1.5, 2.1, 0.5]} rotation={[0, Math.PI / 4, 0]} />
        <Trinket position={[1.4, 2.15, 0.2]} type="star" color="#fde047" />
        <Trinket position={[0.8, 2.15, -0.6]} type="diamond" color="#f472b6" />
        <Trinket position={[-0.8, 2.15, 0.6]} type="heart" color="#c084fc" />
        {/* Mug */}
        <mesh position={[1.2, 2.2, -0.3]} castShadow>
          <cylinderGeometry args={[0.1, 0.1, 0.2]} />
          <meshStandardMaterial color="#fca5a5" />
        </mesh>
        {/* Books on desk */}
        <Books position={[-1.4, 2.1, 0.2]} count={3} width={0.4} />
      </group>

      {/* Floating Shelves above Desk */}
      <group position={[3, 4, -4.8]}>
        <RoundedBox position={[0, 0, 0]} args={[3, 0.1, 0.8]} radius={0.02} castShadow>
          <meshStandardMaterial color="#ffffff" />
        </RoundedBox>
        <Books position={[-0.8, 0.05, 0]} count={8} width={1.2} />
        <PottedPlant position={[1, 0.05, 0]} />
        <FairyFigurine position={[0.2, 0.05, 0.2]} />
        <Trinket position={[1.3, 0.15, 0.2]} type="star" color="#a7f3d0" />
        
        <RoundedBox position={[0, 1.2, 0]} args={[2.5, 0.1, 0.8]} radius={0.02} castShadow>
          <meshStandardMaterial color="#ffffff" />
        </RoundedBox>
        <Books position={[0.5, 1.25, 0]} count={5} width={0.8} />
        <PottedPlant position={[-0.2, 1.25, 0]} />
        <mesh position={[-0.8, 1.4, 0]} castShadow>
          <sphereGeometry args={[0.2]} />
          <meshStandardMaterial color="#fde047" />
        </mesh>
        <Trinket position={[-1.1, 1.35, 0.1]} type="diamond" color="#818cf8" />
      </group>

      {/* Interactive Framed Pictures (Clickable) - Removed to avoid overlapping with posters */}

      {/* --- MAGICAL INTERACTIVE PLUSHIES --- */}
      
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1} position={[-2, 2.5, 0]}>
        <mesh castShadow onClick={(e) => { e.stopPropagation(); onInteract('plushie', '1'); }} onPointerOver={() => document.body.style.cursor = 'pointer'} onPointerOut={() => document.body.style.cursor = 'auto'}>
          <sphereGeometry args={[0.4, 32, 32]} />
          <meshStandardMaterial color="#eab308" emissive="#eab308" emissiveIntensity={0.5} />
        </mesh>
      </Float>

      <Float speed={2.5} rotationIntensity={1} floatIntensity={1.5} position={[3, 3.5, -3.5]}>
        <mesh castShadow onClick={(e) => { e.stopPropagation(); onInteract('plushie', '2'); }} onPointerOver={() => document.body.style.cursor = 'pointer'} onPointerOut={() => document.body.style.cursor = 'auto'}>
          <octahedronGeometry args={[0.3, 0]} />
          <meshStandardMaterial color="#6366f1" emissive="#6366f1" emissiveIntensity={0.8} />
        </mesh>
      </Float>

      <Float speed={1.5} rotationIntensity={0.8} floatIntensity={1.2} position={[1, 1.5, 3]}>
        <mesh castShadow onClick={(e) => { e.stopPropagation(); onInteract('plushie', '3'); }} onPointerOver={() => document.body.style.cursor = 'pointer'} onPointerOut={() => document.body.style.cursor = 'auto'}>
          <torusGeometry args={[0.25, 0.1, 16, 32]} />
          <meshStandardMaterial color="#ec4899" emissive="#ec4899" emissiveIntensity={0.6} />
        </mesh>
      </Float>

      <Float speed={3} rotationIntensity={1.2} floatIntensity={0.8} position={[-3.5, 1.2, 3.5]}>
        <mesh castShadow onClick={(e) => { e.stopPropagation(); onInteract('plushie', '4'); }} onPointerOver={() => document.body.style.cursor = 'pointer'} onPointerOut={() => document.body.style.cursor = 'auto'}>
          <coneGeometry args={[0.3, 0.6, 32]} />
          <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={0.4} />
        </mesh>
      </Float>

      {/* Scattered Floor Cushions */}
      <RoundedBox position={[2, 0.2, 2]} args={[1, 0.4, 1]} radius={0.2} castShadow rotation={[0, 0.5, 0]}>
        <meshStandardMaterial color="#fbcfe8" />
      </RoundedBox>
      <RoundedBox position={[3, 0.15, 3]} args={[0.8, 0.3, 0.8]} radius={0.15} castShadow rotation={[0, -0.2, 0]}>
        <meshStandardMaterial color="#e0e7ff" />
      </RoundedBox>

      {/* Floor Trinkets */}
      <Trinket position={[1, 0.1, 2]} type="star" color="#fde047" />
      <Trinket position={[-1, 0.1, 3]} type="heart" color="#f472b6" />
      <Trinket position={[2.5, 0.1, 0]} type="diamond" color="#a7f3d0" />
      <Trinket position={[-3, 0.1, -1]} type="star" color="#c084fc" />
      <Trinket position={[0, 0.1, -2]} type="heart" color="#fde047" />

      {/* Cute Dolls */}
      <Doll type={1} position={[-2, 1.1, -1.5]} rotation={[0, 0.5, 0]} scale={0.8} onInteract={onInteract} /> {/* Bunny on bed */}
      <Doll type={2} position={[1.5, 0, 1.5]} rotation={[0, -0.8, 0]} scale={1} onInteract={onInteract} /> {/* Bear on rug */}
      <Doll type={3} position={[0, 0, 2]} rotation={[0, -0.2, 0]} scale={0.8} onInteract={onInteract} /> {/* Robot on center floor */}
      <Doll type={4} position={[-2, 0, 2]} rotation={[0, 0.5, 0]} scale={0.9} onInteract={onInteract} /> {/* Mushroom on front left floor */}
      <Doll type={5} position={[2, 2.1, -2.5]} rotation={[0, -0.5, 0]} scale={0.8} onInteract={onInteract} /> {/* Wizard on front edge of desk */}
      <Doll type={6} position={[-4, 0, 3]} rotation={[0, 0.8, 0]} scale={1.1} onInteract={onInteract} /> {/* Star Child near window */}

      {/* Magical Sparkles Everywhere */}
      <Sparkles count={300} scale={14} size={4} speed={0.4} opacity={0.6} color="#f472b6" />
      <Sparkles count={150} scale={12} size={6} speed={0.2} opacity={0.4} color="#fde047" />
      <Sparkles count={100} scale={10} size={5} speed={0.6} opacity={0.5} color="#818cf8" />
    </group>
  );
}

// --- Main Room Component ---

export default function Room() {
  const [activePopup, setActivePopup] = useState<{ type: 'frame' | 'plushie' | 'poster' | 'doll', id: string, url?: string } | null>(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.warn("Autoplay prevented by browser. Click the play button to start music.", error);
            setIsMusicPlaying(false);
          });
        }
      } else {
        audioRef.current.pause();
      }
    }
  }, [isMusicPlaying]);

  return (
    <motion.div 
      className="relative w-full h-full bg-[#d8b4fe]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Using a highly reliable public domain relaxing track (Erik Satie - Gymnopédie No. 1) */}
      <audio 
        ref={audioRef} 
        src="https://upload.wikimedia.org/wikipedia/commons/4/4b/Gymnop%C3%A9die_No._1.ogg" 
        loop 
        preload="auto"
        crossOrigin="anonymous"
      />

      {/* 3D Canvas */}
      <Canvas shadows camera={{ position: [9, 7, 9], fov: 45 }}>
        <color attach="background" args={['#d8b4fe']} />
        <fog attach="fog" args={['#d8b4fe', 15, 45]} />
        
        <ambientLight intensity={0.5} />
        <directionalLight 
          position={[5, 12, 5]} 
          intensity={1.0} 
          castShadow 
          shadow-mapSize={[2048, 2048]} 
          shadow-camera-near={0.5}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
          shadow-bias={-0.0001}
        />
        <pointLight position={[-2, 4, -2]} color="#c084fc" intensity={2} distance={12} />
        <pointLight position={[3, 3, -3]} color="#fde047" intensity={1.5} distance={10} />
        <pointLight position={[0, 6, 0]} color="#f472b6" intensity={1} distance={15} />

        <Suspense fallback={null}>
          <RoomModel onInteract={(type, id, url) => setActivePopup({ type, id, url })} />
          <Environment preset="city" />
          <ContactShadows position={[0, -0.99, 0]} opacity={0.6} scale={25} blur={2.5} far={4.5} color="#1e1b4b" />
        </Suspense>

        <OrbitControls 
          makeDefault 
          minPolarAngle={0} 
          maxPolarAngle={Math.PI / 2 - 0.05} 
          minDistance={5} 
          maxDistance={25}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>

      {/* 2D UI Overlay */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 px-6 py-3 bg-white/40 backdrop-blur-md rounded-full border border-white/60 text-pink-900 font-medium text-sm shadow-lg pointer-events-none flex items-center gap-2">
        <SparklesIcon size={16} className="text-pink-500" />
        Drag to rotate • Scroll to zoom • Click glowing objects
        <SparklesIcon size={16} className="text-pink-500" />
      </div>

      <button 
        onClick={() => setIsMusicPlaying(!isMusicPlaying)}
        className="absolute bottom-8 right-8 p-4 bg-white/40 backdrop-blur-md rounded-full border border-white/60 text-pink-900 shadow-lg hover:bg-white/60 transition-colors z-40 cursor-pointer"
      >
        {isMusicPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
      </button>

      <Popup activePopup={activePopup} onClose={() => setActivePopup(null)} />
    </motion.div>
  );
}
