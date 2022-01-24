
function getPilihanComputer(){
	const computer = Math.random();
	if(computer < 0.34) return 'batu';
	if(computer >= 0.34 && computer > 0.67) return 'kertas';
	return 'gunting';
}

function getHasil(computer,player){
	if(player == computer) return 'SERI';
	if(player == 'batu') return (computer == 'gunting') ? 'MENANG!' : 'KALAH!';
	if(player == 'kertas') return (computer == 'batu') ? 'KALAH!' : 'MENANG!';
	if(player == 'gunting') return (computer == 'batu') ? 'KALAH!' : 'MENANG!';
}

function putar(){
	const gambarcomp = document.querySelector('.satu ul li img');
	const gambar = ['batu','kertas','gunting'];
	let i = 0;
	const waktuMulai = new Date().getTime();
	setInterval(function(){
		if (new Date().getTime() - waktuMulai > 1000) {
			clearInterval;
			return;
		}
		gambarcomp.setAttribute('src' , '../images/games/' + gambar[i++] + '.png');
		if(i == gambar.length) i = 0;
	}, 100);
}

const pilihan = document.querySelectorAll('.dua ul li img');
let win = 1;
let lose = 1;
pilihan.forEach(function(pil){
	
	pil.addEventListener('click', function(){		const pilihanComputer = getPilihanComputer();
		const pilihanPlayer = pil.className;
		const hasil = getHasil(pilihanComputer,pilihanPlayer);
		
		putar();
		setTimeout(function(){
			const gambarComputer = document.querySelector('.gambarComputer');
			gambarComputer.setAttribute('src', '../images/games/'+pilihanComputer+'.png');
			const info = document.querySelector('.info');
			info.innerHTML = hasil;
			const skorComp = document.querySelector('.skorComp');
			const skorPlayer = document.querySelector('.skorPlayer');
			if(hasil == 'MENANG!'){
				skorPlayer.innerHTML = win++;
			}
			if(hasil == 'KALAH!'){
				skorComp.innerHTML = lose++;	
			}
		},1000);
		sPlayer.innerHTML = pPlayer;
	})
});