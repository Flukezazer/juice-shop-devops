describe('Automated E-commerce Testing - Project 1', () => {
  
  const clearOverlays = () => {
    cy.get('body').then(($body) => {
      const dismissBtn = 'button[aria-label="Close Welcome Banner"]';
      if ($body.find(dismissBtn).length > 0) {
        cy.get(dismissBtn).click({ force: true });
      }
      cy.get('body').click(0, 0, { force: true });
    });
    cy.wait(1000);
  };

  it('Scenario 1: ควรจะเปิดดูรายละเอียดสินค้าและกดปิดได้ถูกต้อง', () => {
    cy.viewport(1280, 800);
    cy.visit('http://localhost:3000');
    
    clearOverlays();

    // 1. คลิกสินค้าตัวที่ 2
    cy.get('mat-grid-tile', { timeout: 10000 }).should('be.visible');
    cy.get('mat-grid-tile').eq(1).click({ force: true });

    // 2. รอให้หน้าต่างเด้งขึ้นมาจนนิ่ง
    cy.get('.mat-mdc-dialog-container', { timeout: 10000 }).should('be.visible');
    cy.wait(1000); // สำคัญ: รอให้ปุ่มปิดโหลดเสร็จ

    // 3. ปรับวิธีปิด: ลองหาปุ่มปิดที่มีคำว่า Close หรือใช้ Class ของปุ่มปิดโดยตรง
    // หากหา aria-label ไม่เจอ เราจะใช้การกดปุ่ม ESC ของคีย์บอร์ดแทน (วิธีที่ชัวร์ที่สุด)
    cy.get('body').type('{esc}'); 
    
    // 4. ยืนยันว่าหน้าต่างหายไปแล้ว
    cy.get('.mat-mdc-dialog-container').should('not.exist');
  });

  it('Scenario 2: ควรจะค้นหาสินค้า "Apple" แล้วเจอผลลัพธ์ที่ถูกต้อง', () => {
    cy.visit('http://localhost:3000');
    clearOverlays();

    cy.get('#searchQuery').click({ force: true });
    cy.get('#searchQuery input').type('apple{enter}', { force: true });

    cy.wait(1500);
    cy.get('mat-grid-tile').should('contain', 'Apple');
    cy.get('mat-grid-tile').should('not.contain', 'Banana');
  });
});