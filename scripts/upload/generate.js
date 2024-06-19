const form = document.querySelector('form');
const resultDiv = document.getElementById('result');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  resultDiv.textContent = 'กำลังประมวลผล...';

  const userList = [];
  const formData = new FormData(form);
  const response = await fetch('/upload', { method: 'POST', body: formData });

  if (response.ok) {
    let count = 1;
    const extractedName = await response.text();
    const mapName = this.mapNameList(extractedName);
    const data = this.getItemFormData(formData, mapName);
    const splitItem = this.getSplitItem(data);
    const user = shuffleArray(mapName);

    console.log(extractedName);

    if (mapName.length < splitItem.length) {
      resultDiv.textContent = `จำนวนตัวละคร : ${mapName.length} / จำนวนรวมของแบ่งไอเท็ม : ${splitItem.length} (จำนวนตัวละครต้องมากกว่าหรือเท่ากับการแบ่งไอเท็ม)`;
      throw new Error(`จำนวนตัวละคร : ${mapName.length} / จำนวนรวมของแบ่งไอเท็ม : ${splitItem.length} (จำนวนตัวละครต้องมากกว่าหรือเท่ากับการแบ่งไอเท็ม)`);
    }

    for (let i = 0; i < splitItem.length; i++) {
      if (i < splitItem.length) {
        const replace = splitItem[i].name.replace("Item", "");
        userList.push({
          id: count + i,
          name: user[i],
          item: splitItem[i].name,
          amount: splitItem[i].amount,
          image: `/assets/${replace}.png`
        });
      }
    }

    // สร้างตาราง HTML
    const table = document.createElement('table');
    const headerRow = table.insertRow();
    headerRow.insertCell().textContent = 'ลำดับ';
    headerRow.insertCell().textContent = 'ชื่อ';
    headerRow.insertCell().textContent = 'รายการ';
    headerRow.insertCell().textContent = 'จำนวน';

    for (const user of userList) {
      const row = table.insertRow();
      row.insertCell().textContent = user.id;
      row.insertCell().textContent = user.name;

      const imageCell = row.insertCell();
      const img = document.createElement('img');
      img.src = user.image;
      img.alt = user.name;
      img.style.width = '50px';
      imageCell.appendChild(img);

      row.insertCell().textContent = user.amount;
    }

    resultDiv.innerHTML = ''; // ล้างเนื้อหาเดิม
    resultDiv.appendChild(table);
  }
  else {
    resultDiv.textContent = 'เกิดข้อผิดพลาดในการดึงข้อมูล';
    throw new Error('เกิดข้อผิดพลาดในการดึงข้อมูล');
  }
});

function mapNameList(extractedName) {
  const nameList = [];
  nameList.push(extractedName);
  const arr = extractedName.split("-");
  const cleanedArr = arr.filter(item => item.trim() !== '')
    .map(item => item.replace(/```/g, '').trim());
  return cleanedArr;
}

function getSplitItem(data) {
  let list = [];
  for (let i = 0; i < data.length; i++) {
    const element = data[i];
    let remainingItemCount = element.itemCount;
    let baseAmount = Math.floor(element.itemCount / element.peopleCount);
    let monneyAmount = element.itemCount / element.peopleCount;

    for (let j = 0; j < element.peopleCount; j++) {
      let amount = baseAmount;
      if (j < remainingItemCount % element.peopleCount) {
        amount++;
      }
      remainingItemCount--;

      if (element.name == "monneyItem") {
        amount = monneyAmount.toFixed(2)
      }

      if (element.name == "coinguildItem") {
        amount = monneyAmount.toFixed(2)
      }

      list.push({
        name: element.name,
        amount: amount,
      });
    }

  }
  return list;
}

function getItemFormData(formData, mapName) {
  const list = [
    {
      name: "seedItem",
      itemCount: formData.get('seedItemCount'),
      peopleCount: formData.get('seedPeopleCount'),
    },
    {
      name: "acc1Item",
      itemCount: formData.get('acc1ItemCount'),
      peopleCount: formData.get('acc1PeopleCount'),
    },
    {
      name: "acc2Item",
      itemCount: formData.get('acc2ItemCount'),
      peopleCount: formData.get('acc2PeopleCount'),
    },
    {
      name: "acc3Item",
      itemCount: formData.get('acc3ItemCount'),
      peopleCount: formData.get('acc3PeopleCount'),
    },
    {
      name: "acc4Item",
      itemCount: formData.get('acc4ItemCount'),
      peopleCount: formData.get('acc4PeopleCount'),
    }, {
      name: "acc5Item",
      itemCount: formData.get('acc5ItemCount'),
      peopleCount: formData.get('acc5PeopleCount'),
    }, {
      name: "blueItem",
      itemCount: formData.get('blueItemCount'),
      peopleCount: formData.get('bluePeopleCount'),
    },
    {
      name: "blue2Item",
      itemCount: formData.get('blue2ItemCount'),
      peopleCount: formData.get('blue2PeopleCount'),
    }, {
      name: "purpleItem",
      itemCount: formData.get('purpleItemCount'),
      peopleCount: formData.get('purplePeopleCount'),
    }, {
      name: "purple2Item",
      itemCount: formData.get('purple2ItemCount'),
      peopleCount: formData.get('purple2PeopleCount'),
    }, {
      name: "redItem",
      itemCount: formData.get('redItemCount'),
      peopleCount: formData.get('redPeopleCount'),
    }, {
      name: "red2Item",
      itemCount: formData.get('red2ItemCount'),
      peopleCount: formData.get('red2PeopleCount'),
    }, {
      name: "yellowItem",
      itemCount: formData.get('yellowItemCount'),
      peopleCount: formData.get('yellowPeopleCount'),
    }, {
      name: "yellow2Item",
      itemCount: formData.get('yellow2ItemCount'),
      peopleCount: formData.get('yellow2PeopleCount'),
    }, {
      name: "papirusItem",
      itemCount: formData.get('papirusItemCount'),
      peopleCount: formData.get('papirusPeopleCount'),
    }, {
      name: "rockmoonItem",
      itemCount: formData.get('rockmoonItemCount'),
      peopleCount: formData.get('rockmoonPeopleCount'),
    }, {
      name: "waterpurpleItem",
      itemCount: formData.get('waterpurpleCount'),
      peopleCount: formData.get('waterpurplePeopleCount'),
    }, {
      name: "coinguildItem",
      itemCount: formData.get('coinguildItemCount'),
      peopleCount: formData.get('coinguildPeopleCount'),
    }]

  let totalItem = 0;
  for (let index = 0; index < list.length; index++) {
    totalItem += Number(list[index].peopleCount);
  }

  let totalName = mapName.length - totalItem;
  const monneyList = {
    name: "monneyItem",
    itemCount: formData.get('monneyItemCount'),
    peopleCount: totalName,
  }

  list.push(monneyList);

  const filter = list.filter(x => x.peopleCount > 0);
  return filter;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}