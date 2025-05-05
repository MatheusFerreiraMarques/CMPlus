const validDDDs = [
    "11","12","13","14","15","16","17","18","19", // SP
    "21","22","24",                               // RJ
    "27","28",                                    // ES
    "31","32","33","34","35","37","38",           // MG
    "41","42","43","44","45","46",                // PR
    "47","48","49",                               // SC
    "51","53","54","55",                          // RS
    "61","62","63","64","65","66","67","68","69", // Centro-Oeste/Norte
    "71","73","74","75","77","79",                // BA/SE
    "81","82","83","84","85","86","87","88","89", // NE
    "91","92","93","94","95","96","97","98","99"  // Norte
  ];
  
  export type ProcessedResult = {
    validNumbers: any[];
    discardedNumbers: any[];
  };
  
  export function formatAndFilterPhones(data: any[]): ProcessedResult {
    const valid: any[] = [];
    const discarded: any[] = [];
  
    data.forEach((row) => {
      let rawPhone: string = row.telefone || row.phone || "";
      let cleaned = rawPhone.replace(/\D/g, ""); // Remove tudo que não é número
  
      // Número com 10 ou 11 dígitos, assumimos que é brasileiro e pode precisar do +55
      if (cleaned.length >= 10 && cleaned.length <= 11) {
        const ddd = cleaned.substring(0, 2);
        if (!validDDDs.includes(ddd)) {
          discarded.push({ ...row, motivo: "DDD inválido" });
          return;
        }
        cleaned = `55${cleaned}`;
      }
  
      if (!cleaned.startsWith("55")) {
        discarded.push({ ...row, motivo: "Fora do Brasil" });
        return;
      }
  
      const ddd = cleaned.substring(2, 4);
      if (!validDDDs.includes(ddd)) {
        discarded.push({ ...row, motivo: "DDD inválido" });
        return;
      }
  
      // Substitui o campo original com o número formatado
      valid.push({ ...row, telefone: `+${cleaned}` });
    });
  
    return { validNumbers: valid, discardedNumbers: discarded };
  }
  